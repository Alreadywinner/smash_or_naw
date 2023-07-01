import { useRef, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import PropTypes from 'prop-types';
import {
  useAddNewPostCommentMutation,
  useFetchCurrentPostCommentQuery,
} from '../../redux/slices/userApiSlice';
import Loader from '../Loader/Loader';
import { convertToLocalAM_PM } from '../../utils/helpers';
import Toast from '../Toast/Toast';

const Comments = ({ currentPostIndex, currentPost }) => {
  const { value: userData } = useLocalStorage('userInfo');
  const newComment = useRef('');
  const post_id = currentPost._id;
  const [showToast, setShowToast] = useState({
    visible: false,
    type: '',
    msg: '',
  });
  const { data: fetchCurrentPostComment, isLoading: commentsFetchLoading } =
    useFetchCurrentPostCommentQuery(post_id);
  const [addNewPostComment, { isLoading: commentsAddLoading }] =
    useAddNewPostCommentMutation();
  const saveComment = async () => {
    try {
      const res = await addNewPostComment({
        post_id: currentPost._id,
        author: userData._id,
        comment: newComment.current.value,
      }).unwrap();
      if (res) {
        setShowToast({
          visible: true,
          type: 'success',
          msg: 'Comment added successfully',
        });
      }
    } catch (err) {
      setShowToast({
        visible: true,
        type: 'error',
        msg: err?.data?.message || err.error || 'Unexpected Error Occurred',
      });
    }
  };
  const deleteComment = (commentId) => {
    console.log('delete comment now', commentId);
  };
  const onToastClick = () => {
    setShowToast({
      visible: false,
      type: '',
      msg: '',
    });
  };
  if (commentsFetchLoading) {
    return <Loader />;
  }
  return (
    <>
      {showToast.visible && (
        <Toast
          message={showToast.msg}
          onClose={onToastClick}
          type={showToast.type}
        />
      )}
      <div className="antialiased mx-auto max-w-screen-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Comments</h3>
        {fetchCurrentPostComment?.allComments &&
        fetchCurrentPostComment?.allComments.length > 0 ? (
          <div className="space-y-4">
            {fetchCurrentPostComment?.allComments.map((element) => {
              return (
                <div className="flex" key={element._id}>
                  <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                    <strong>{element.author.name}</strong>{' '}
                    <span className="text-xs text-gray-400">
                      {convertToLocalAM_PM(element.createdAt)}
                    </span>
                    <p className="text-sm">{element.comment}</p>
                    <div className="mt-4 flex items-center">
                      <div
                        className="text-sm text-gray-500 font-semibold hover:cursor-pointer"
                        onClick={() => deleteComment(element._id)}
                      >
                        delete
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xl">There Are No Comments</p>
        )}
      </div>
      <form className="max-w-xl mx-auto p-4" onSubmit={saveComment}>
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-bold">{userData && userData?.name}</h3>
        </div>
        <div className="mt-4">
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            rows="4"
            placeholder="Write a new comment..."
            ref={newComment}
          ></textarea>
        </div>
        <div className="mt-4">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md"
            type="submit"
            disabled={commentsAddLoading}
          >
            {commentsAddLoading ? <Loader /> : 'Submit'}
          </button>
        </div>
      </form>
    </>
  );
};

Comments.propTypes = {
  currentPostIndex: PropTypes.number,
  currentPost: PropTypes.object.isRequired,
};

export default Comments;
