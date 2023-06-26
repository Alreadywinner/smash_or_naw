import Loader from '../../components/Loader/Loader';
import PostCard from '../../components/PostCard/PostCard';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { useFetchAllPostsQuery } from '../../redux/slices/userApiSlice';
import { useState } from 'react';
import { useDeletePostMutation } from '../../redux/slices/adminSlice';
import Toast from '../../components/Toast/Toast';

const PostPage = () => {
  const { data: postsData, isLoading: postsLoading } = useFetchAllPostsQuery();
  const [deletePost, { isLoading: deleteLoading }] = useDeletePostMutation();
  const storage = getStorage();
  const [deletePostLoading, setDeletePostLoading] = useState(false);
  const [showToast, setShowToast] = useState({
    visible: false,
    type: '',
    msg: '',
  });
  const deletePostClick = async (post) => {
    setDeletePostLoading(true);
    try {
      if (post && post.posts_data && post.posts_data.length > 0) {
        post.posts_data.map(async (post) => {
          // Convert the download URL to a storage reference
          const storageRef = ref(storage, post);

          // Delete the file using the storage reference
          await deleteObject(storageRef);
        });
      }

      const res = await deletePost({ post }).unwrap();
      if (res) {
        setShowToast({
          visible: true,
          type: 'success',
          msg: 'post deleted successfully',
        });
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      setShowToast({
        visible: true,
        type: 'error',
        msg: 'Error deleting post',
      });
    } finally {
      setDeletePostLoading(false);
    }
  };
  const onToastClick = () => {
    setShowToast({
      visible: false,
      type: '',
      msg: '',
    });
  };
  if (postsLoading) {
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
      <div className="flex items-center justify-center flex-col mt-10 mr-3 ml-3">
        <p className="text-3xl font-bold mb-10">All Posts</p>
        <div className="flex gap-5">
          {postsData?.allPosts && postsData?.allPosts.length > 0 ? (
            postsData?.allPosts.map((element) => {
              {
                return (
                  <PostCard
                    post={element}
                    key={element._id}
                    onDelete={() => deletePostClick(element)}
                    deletePostLoading={deletePostLoading || deleteLoading}
                  />
                );
              }
            })
          ) : (
            <p className="text-xl">There Are No posts</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PostPage;
