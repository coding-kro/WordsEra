import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useFetch } from '@/hooks/useFetch';
import Loading from '@/components/Loading';

import { IoTrashBinSharp } from 'react-icons/io5';
import { deleteData } from '@/helpers/handleDelete';
import { showToast } from '@/helpers/showToast';
import moment from 'moment';

const Comments = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const [refreshData, setRefreshData] = useState(false);

  const { data, loading } = useFetch(
    `${API_URL}/comment/get-all-comment`,
    {
      method: 'get',
      credentials: 'include',
    },
    [refreshData],
  );



  const handleDelete = async (id) => {
    const response = await deleteData(`${API_URL}/comment/delete/${id}`);
    if (response) {
      setRefreshData(!refreshData);
      showToast('success', 'Data deleted');
    } else {
      showToast('error', 'Data not deleted');
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Blog</TableHead>
                <TableHead>Comment By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.comments.length > 0 ? (
                data.comments.map((comment) => (
                  <TableRow key={comment._id}>
                    <TableCell>{comment?.blogid?.title}</TableCell>
                    <TableCell>{comment?.user?.username}</TableCell>
                    <TableCell>
                      {moment(comment?.createdAt).format('MM/DD/YYYY')}
                    </TableCell>
                    <TableCell>{comment?.comment}</TableCell>
                    <TableCell className="flex gap-3">
                      <Button
                        onClick={() => handleDelete(comment._id)}
                        variant="outline"
                        className="hover:bg-black hover:text-white"
                      >
                        <IoTrashBinSharp />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="3">Data not found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Comments;
