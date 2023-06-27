import { Button, Label, Modal, TextInput } from 'flowbite-react';
import Toast from '../Toast/Toast';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { getStorage, deleteObject, ref } from 'firebase/storage';
import Loader from '../Loader/Loader';
import { useEditPostMutation } from '../../redux/slices/adminSlice';
import { findUniqueValues } from '../../utils/helpers';

const EditPost = ({ visible, onClose, postData }) => {
  const storage = getStorage();
  const [postLinks, setPostLinks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const postNameRef = useRef('');
  const [showToast, setShowToast] = useState({
    visible: false,
    type: '',
    msg: '',
  });
  const [loading, setLoading] = useState(false);
  const [editPost, { isLoading }] = useEditPostMutation();
  const ratingOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  useEffect(() => {
    if (postData && postData.posts_data.length > 0 && postData.post_rating) {
      setPostLinks(postData.posts_data);
      setSelectedOption(postData.post_rating);
    }
    // Update the postNameRef value after a delay
    const timer = setTimeout(() => {
      postNameRef.current.value = postData.post_name;
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [postData]);

  const onToastClick = () => {
    setShowToast({
      visible: false,
      type: '',
      msg: '',
    });
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const deletePostElement = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedPost = {
        post_name: postNameRef.current.value,
        posts_data: postLinks,
        post_rating: selectedOption,
      };
      const post = {
        ...postData,
        ...updatedPost,
      };
      if (postData.posts_data.length !== updatedPost.posts_data.length) {
        const uniqueValues = findUniqueValues(
          postData.posts_data,
          updatedPost.posts_data,
        );
        uniqueValues.map(async (element) => {
          // Convert the download URL to a storage reference
          const storageRef = ref(storage, element);

          // Delete the file using the storage reference
          await deleteObject(storageRef);
        });
      }
      const res = await editPost({ post }).unwrap();
      if (res) {
        setShowToast({
          visible: true,
          type: 'success',
          msg: 'File edited successfully',
        });
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      setShowToast({
        visible: true,
        type: 'error',
        msg: 'Error deleting file',
      });
    } finally {
      setLoading(false);
    }
  };
  const removeSelectedPost = (post) => {
    setPostLinks(postLinks.filter((item) => item !== post));
  };
  return (
    <Modal show={visible} onClose={onClose}>
      {showToast.visible && (
        <Toast
          message={showToast.msg}
          onClose={onToastClick}
          type={showToast.type}
        />
      )}
      <Modal.Header>Edit Post</Modal.Header>
      <Modal.Body>
        <form onSubmit={deletePostElement}>
          {/* Post Name */}
          <div className="mt-5 mb-5">
            <div className="mb-2 block">
              <Label htmlFor="title" value="Post Title" />
            </div>
            <TextInput
              id="title"
              placeholder="New Post"
              required
              type="text"
              ref={postNameRef}
            />
          </div>
          {/* Posts Links */}
          <div className="mt-5 mb-5">
            <div className="mb-2 block">
              <Label htmlFor="title" value="All Posts :" />
            </div>
            {postLinks &&
              postLinks?.length > 0 &&
              postLinks?.map((post) => {
                return (
                  <div key={post} className="flex gap-2 items-center mt-2 mb-2">
                    <a
                      href={post}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate cursor-pointer hover:text-blue-700"
                    >
                      {post}
                    </a>
                    <Button
                      className="bg-red-400 text-white hover:bg-red-500"
                      onClick={() => removeSelectedPost(post)}
                    >
                      Delete
                    </Button>
                  </div>
                );
              })}
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
          <div className="flex justify-center mt-5 mr-5">
            <Button
              className="bg-blue-700 text-white hover:bg-blue-400"
              type="submit"
              disabled={loading || isLoading}
            >
              {loading || isLoading ? <Loader /> : 'Update'}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

EditPost.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  postData: PropTypes.object.isRequired,
};

export default EditPost;
