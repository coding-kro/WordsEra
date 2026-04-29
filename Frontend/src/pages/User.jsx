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
import userIcon from '@/assets/images/user.png';
import moment from 'moment';

const User = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const [refreshData, setRefreshData] = useState(false);

  const { data, loading } = useFetch(
    `${API_URL}/user/get-all-user`,
    {
      method: 'get',
      credentials: 'include',
    },
    [refreshData],
  );


const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure to delete this data?');

    if (!isConfirmed) {
      showToast('info', 'Deletion cancelled');
      return;
    }

    const response = await deleteData(`${API_URL}/user/delete/${id}`);

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
                <TableHead>Role</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Avatar</TableHead>
                <TableHead>Dated</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.user.length > 0 ? (
                data.user.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <img
                        src={user.avatar || userIcon}
                        className="w-10 rounded-full"
                      />
                    </TableCell>
                    <TableCell>
                      {moment(user.createdAt).format('DD-MM-YYYY')}
                    </TableCell>
                    <TableCell className="flex gap-3">
                      <Button
                        onClick={() => handleDelete(user._id)}
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

export default User;
