import { Button, Label, TextInput } from 'flowbite-react';
import { useRef, useState } from 'react';
import FilesIcon from '../../assets/files.svg';
import Toast from '../../components/Toast/Toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  useAddAdMutation,
  useAdminLogoutMutation,
} from '../../redux/slices/adminSlice';
import Loader from '../../components/Loader/Loader';
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { clearCredentials } from '../../redux/slices/authSlice';

const AdPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showToast, setShowToast] = useState({
    visible: false,
    type: '',
    msg: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formLoading, setFormLoading] = useState(false);
  const [addAd, { isLoading: addAdLoading }] = useAddAdMutation();
  const [logoutApiCall, { isLoading }] = useAdminLogoutMutation();
  const adLinkRef = useRef('');
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  function isValidURL(url) {
    return urlRegex.test(url);
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  const handleFileUpload = async (imageSrc) => {
    setFormLoading(true);
    const uploadPromises = [];
    const fileDownloadURLs = [];
    const storageRef = ref(storage, `/ads/${imageSrc.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageSrc);
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
    try {
      await Promise.all(uploadPromises);
      if (fileDownloadURLs && fileDownloadURLs.length > 0) {
        const res = await addAd({
          ad_link: adLinkRef.current.value,
          ad_image: fileDownloadURLs[0],
        }).unwrap();
        setShowToast({
          visible: true,
          type: 'success',
          msg: res.msg,
        });
        // make backend request
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setShowToast({
        visible: true,
        type: 'error',
        msg: error?.data?.message || error.error || 'Unexpected Error Occurred',
      });
    } finally {
      adLinkRef.current.value = '';
      setSelectedImage(null);
      imageSrc = null;
      setFormLoading(false);
    }
  };
  const handleClick = (event) => {
    event.preventDefault();
    if (isValidURL(adLinkRef.current.value) && selectedImage) {
      handleFileUpload(selectedImage);
      setShowToast({
        visible: true,
        type: 'success',
        msg: 'Ad added successfully',
      });
    } else {
      setShowToast({
        visible: true,
        type: 'error',
        msg: 'failed to add the Ad make sure data entered is correct',
      });
    }
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
      type: '',
      msg: '',
    });
  };
  return (
    <>
      <div className="flex justify-end gap-5 mt-5 mr-5">
        <Button
          className="bg-red-400 text-white hover:bg-red-500"
          onClick={() => navigate('/admin/login')}
        >
          Add a Post
        </Button>
        <Button
          className="bg-red-400 text-white hover:bg-red-500"
          onClick={logoutHandler}
        >
          {isLoading ? <Loader /> : 'Logout'}
        </Button>
      </div>
      <div className="h-screen flex flex-col items-center justify-center">
        {showToast.visible && (
          <Toast
            message={showToast.msg}
            onClose={onToastClick}
            error={showToast.type === 'error' && true}
            success={showToast.type === 'success' && true}
          />
        )}
        <p className="text-3xl font-bold mt-10">Add a New Ad</p>
        <form
          className="flex max-w-md flex-col gap-4 h-full w-3/4 mt-10"
          onSubmit={handleClick}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="link" value="Add a OnClick link for an Ad" />
            </div>
            <TextInput
              id="link"
              ref={adLinkRef}
              placeholder="i.e. https://wwww.facebook.com"
              required
              type="text"
            />
          </div>
          <div className="flex items-center gap-5">
            <div className="shrink-0">
              <img
                className="h-16 w-16 object-cover rounded-full"
                src={selectedImage || FilesIcon}
                alt="Current profile photo"
              />
            </div>
            <label className="block">
              <span className="sr-only">Choose Image for an Ad</span>
              <input
                type="file"
                className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
              "
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <Button className="bg-red-400 hover:bg-red-500 mt-8" type="submit">
            {addAdLoading || formLoading ? <Loader /> : 'Add Ad'}
          </Button>
        </form>
      </div>
    </>
  );
};

export default AdPage;
