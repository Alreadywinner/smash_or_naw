import { Button, Card } from 'flowbite-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import EditPost from '../EditPost/EditPost';
import Loader from '../Loader/Loader';
const PostCard = ({ post, onDelete, deletePostLoading }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const onEditClick = () => {
    setShowEditModal(true);
  };

  return (
    <>
      {showEditModal && (
        <EditPost
          visible={showEditModal}
          onClose={() => setShowEditModal(false)}
          postData={post}
        />
      )}
      <Card className="w-72">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <p>{post.post_name}</p>
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Post Rating : {post.post_rating}
        </p>
        <Button onClick={() => onEditClick()}>
          <p>Edit</p>
        </Button>
        <Button
          className="bg-red-300 text-white hover:bg-red-500"
          onClick={() => onDelete()}
        >
          {deletePostLoading ? <Loader /> : <p>Delete</p>}
        </Button>
      </Card>
    </>
  );
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  deletePostLoading: PropTypes.bool.isRequired,
};

export default PostCard;
