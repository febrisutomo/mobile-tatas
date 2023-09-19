import React, { useState } from 'react';
import { ToastAndroid } from 'react-native';
import axiosInstance from '@src/api/axiosInstance';
import DocumentPicker from 'react-native-document-picker';
import Button from '@components/Button';
import * as Progress from 'react-native-progress';
import { COLORS } from '@src/constants';
import { useQueryClient } from '@tanstack/react-query';

const UploadFileScreen = () => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const queryClient = useQueryClient();

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.xlsx, DocumentPicker.types.xls],
      });
      handleFileUpload(result);
    } catch (err) {
      console.log('handlePickDocument ~ err:', err);
      if (DocumentPicker.isCancel(err)) {
        // Handle user cancelled the picker
      } else {
        // Handle any other error
      }
    }
  };

  const handleFileUpload = async (file) => {
    try {
      setUploading(true);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setProgress(percentCompleted / 100);
        },
      };

      const formData = new FormData();
      console.log(file);
      formData.append('file', file);

      const response = await axiosInstance.post(
        '/screenings/upload-dataset',
        formData,
        config,
      );

      // Handle successful upload response
      console.log('Upload success:', response.data);
      // Alert.alert('Upload file berhasil!');
      ToastAndroid.show('Berhasil import dataset.', ToastAndroid.SHORT);
      queryClient.invalidateQueries({
        queryKey: ['evaluate_model'],
      });
    } catch (error) {
      // Handle error during file upload
      console.error('Upload error:', error);
      ToastAndroid.show('Import dataset gagal.', ToastAndroid.SHORT);
      // Alert.alert('Error uploading file. Please try again later.');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <>
      {uploading && (
        <Progress.Bar progress={progress} width={null} color={COLORS.primary} />
      )}
      <Button
        title="Import Dataset"
        disabled={uploading}
        onPress={handlePickDocument}
      />
    </>
  );
};

export default UploadFileScreen;
