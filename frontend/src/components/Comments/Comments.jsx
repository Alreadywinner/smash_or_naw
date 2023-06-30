import { useRef } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import PropTypes from 'prop-types';

const Comments = ({ currentPostIndex, currentPost }) => {
  const { value: userData } = useLocalStorage('userInfo');
  const newComment = useRef('');
  console.log(currentPostIndex);
  console.log(currentPost);
  const saveComment = () => {
    console.log('saving comment now');
  };
  return (
    <>
      <div className="antialiased mx-auto max-w-screen-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Comments</h3>

        <div className="space-y-4">
          <div className="flex">
            <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
              <strong>Sarah</strong>{' '}
              <span className="text-xs text-gray-400">3:34 PM</span>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua.
              </p>
            </div>
          </div>
        </div>
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
          >
            Submit
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
