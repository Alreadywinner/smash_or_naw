import { Button, Label, TextInput } from 'flowbite-react';
import { useId, useRef, useState } from 'react';
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {
  useAddPostMutation,
  useAdminLogoutMutation,
} from '../../redux/slices/adminSlice';
import Loader from '../Loader/Loader';
import { useDispatch } from 'react-redux';
import { clearCredentials } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Toast from '../Toast/Toast';

const AddPostForm = () => {
  const [fileData, setFileData] = useState([]);
  const [showToast, setShowToast] = useState({
    visible: false,
    type: '',
    msg: '',
  });
  const tempUserId = useId();
  const postNameRef = useRef('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formLoading, setFormLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const [logoutApiCall, { isLoading }] = useAdminLogoutMutation();
  const [addPost, { isLoading: addPostLoading }] = useAddPostMutation();
  const ratingOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const handleFileUpload = async (e) => {
    e.preventDefault();
    const files = fileData;
    const uploadPromises = [];
    const fileDownloadURLs = [];
    if (
      (files && files.length === 0) ||
      selectedOption === '' ||
      postNameRef.current.value === ''
    ) {
      setShowToast({
        visible: true,
        type: 'error',
        msg: 'Please Enter all fields',
      });
    }
    setFormLoading(true);
    Array.from(files).forEach((file) => {
      const storageRef = ref(storage, `/posts/${tempUserId}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      const uploadPromise = new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Handle the upload progress here
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload progress: ${progress}%`);
          },
          (error) => {
            // Handle any upload errors
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            fileDownloadURLs.push(downloadURL);
            // Handle the upload completion
            resolve();
          },
        );
      });

      uploadPromises.push(uploadPromise);
    });
    try {
      await Promise.all(uploadPromises);
      setFileData([]);
      if (
        fileDownloadURLs &&
        fileDownloadURLs.length > 0 &&
        postNameRef.current.value !== ''
      ) {
        const post_name = postNameRef.current.value;
        const res = await addPost({
          post_name,
          posts_data: fileDownloadURLs,
          post_rating: selectedOption,
        }).unwrap();
        setShowToast({
          visible: true,
          type: 'success',
          msg: res.msg,
        });
        // make backend request
      }
      postNameRef.current.value = '';
      fileInputRef.current.value = null;
    } catch (error) {
      console.error('Error uploading files:', error);
      setShowToast({
        visible: true,
        type: 'error',
        msg: error?.data?.message || error.error || 'Unexpected Error Occurred',
      });
    } finally {
      setFormLoading(false);
      setSelectedOption('');
      setFileData([]);
      postNameRef.current.value = '';
      fileInputRef.current.value = '';
    }
  };
  const addNewFiles = (event) => {
    const temp = event.target.files;
    setFileData(temp);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(clearCredentials());
      navigate('/admin/login');
    } catch (err) {
      setShowToast({
        visible: true,
        type: 'error',
        msg: `${err?.data?.message || err.error}`,
      });
    }
  };
  const onToastClick = () => {
    setShowToast({
      visible: false,
      msg: '',
      type: '',
    });
  };
  return (
    <>
      {showToast.visible && (
        <Toast
          message={showToast.msg}
          onClose={onToastClick}
          type={showToast.type}
        />
      )}
      <div className="flex justify-end gap-5 mt-5 mr-5">
        <Button
          className="bg-red-400 text-white hover:bg-red-500"
          // onClick={() => navigate('/admin/Ad')}
        >
          View All Posts
        </Button>
        <Button
          className="bg-red-400 text-white hover:bg-red-500"
          onClick={() => navigate('/admin/Ad')}
        >
          Add an Ad
        </Button>
        <Button
          className="bg-red-400 text-white hover:bg-red-500"
          onClick={logoutHandler}
        >
          {isLoading ? <Loader /> : 'Logout'}
        </Button>
      </div>
      <div className="h-screen flex flex-col items-center justify-center">
        <p className="text-3xl font-bold mt-10">Add a Post</p>
        <form
          className="flex max-w-md flex-col gap-4 h-full w-3/4 mt-10"
          onSubmit={handleFileUpload}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Post Title" />
            </div>
            <TextInput
              ref={postNameRef}
              id="title"
              placeholder="New Post"
              required
              type="text"
            />
          </div>
          {/* Post rating */}
          <div className="relative mt-5 mb-5">
            <div className="mb-2 block">
              <Label htmlFor="rating" value="Post Rating" />
            </div>
            <input
              type="text"
              name="rating"
              className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              placeholder="Select rating"
              onClick={toggleDropdown}
              value={selectedOption}
              readOnly
            />
            {isOpen && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 py-1">
                {ratingOptions.map((option) => (
                  <li
                    key={option}
                    className="py-1 px-4 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <input
              type="file"
              accept="image/*, video/*"
              multiple
              onChange={addNewFiles}
              ref={fileInputRef}
            />
          </div>
          <Button className="bg-red-400 hover:bg-red-500 mt-8" type="submit">
            {addPostLoading || formLoading ? <Loader /> : 'Add Post'}
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddPostForm;
