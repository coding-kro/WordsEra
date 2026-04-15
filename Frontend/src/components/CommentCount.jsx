import { useFetch } from '@/hooks/useFetch';
import React from 'react';
import { FaRegComment } from 'react-icons/fa';
const CommentCount = ({ props }) => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const { data } = useFetch(`${API_URL}/comment/get-count/${props.blogid}`, {
    method: 'get',
    credentials: 'include',
  });

  return (
    <button type="button" className="flex justify-between items-center gap-1">
      <FaRegComment />
      {data && data.commentCount}
    </button>
  );
};

export default CommentCount;
