package com.cashRegisterAndroidApp.barcodeDecoder;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.ChecksumException;
import com.google.zxing.DecodeHintType;
import com.google.zxing.FormatException;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.NotFoundException;
import com.google.zxing.RGBLuminanceSource;
import com.google.zxing.Result;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.common.DecoderResult;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.datamatrix.decoder.Decoder;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.EnumSet;
import java.util.HashMap;

public class BarcodeDecoder {
    public static String decodeBarcodeFromFile1(Context context, String filename) {
        String filePath = context.getFilesDir().getPath() + "/" + filename;
        InputStream inputStream = null;
        try {
            inputStream = new FileInputStream(filePath);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
        Bitmap bitmap = BitmapFactory.decodeStream(inputStream);
        int[] pixels = new int[bitmap.getWidth() * bitmap.getHeight()];
        bitmap.getPixels(pixels, 0, bitmap.getWidth(), 0, 0, bitmap.getWidth(), bitmap.getHeight());
        RGBLuminanceSource source = new RGBLuminanceSource(bitmap.getWidth(), bitmap.getHeight(), pixels);

        BinaryBitmap binaryBitmap = new BinaryBitmap(new HybridBinarizer(source));


        MultiFormatReader multiFormatReader = new MultiFormatReader();
        Result decoderResult;
        try {

            decoderResult = multiFormatReader.decode(binaryBitmap);
        } catch (NotFoundException e) {
            throw new RuntimeException(e);
        }
        return decoderResult.getText();
    }

    public static String decodeBarcodeFromStream(InputStream inputStream) {
        Bitmap bitmap = null;
        try {
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int len;
            while ((len = inputStream.read(buffer)) > 0) {
                byteArrayOutputStream.write(buffer, 0, len);
            }
            byteArrayOutputStream.flush();
            byte[] data = byteArrayOutputStream.toByteArray();

            BitmapFactory.Options options = new BitmapFactory.Options();
            options.inJustDecodeBounds = true;
            BitmapFactory.decodeByteArray(data, 0, data.length, options);

            options.inJustDecodeBounds = false;
            bitmap = BitmapFactory.decodeByteArray(data, 0, data.length, options);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        int[] pixels = new int[bitmap.getWidth() * bitmap.getHeight()];
        bitmap.getPixels(pixels, 0, bitmap.getWidth(), 0, 0, bitmap.getWidth(), bitmap.getHeight());
        RGBLuminanceSource source = new RGBLuminanceSource(bitmap.getWidth(), bitmap.getHeight(), pixels);
        BinaryBitmap binaryBitmap = new BinaryBitmap(new HybridBinarizer(source));

        MultiFormatReader multiFormatReader = new MultiFormatReader();
        Result decoderResult;
        try {
            decoderResult = multiFormatReader.decode(binaryBitmap);
        } catch (NotFoundException e) {
            throw new RuntimeException(e);
        }

        return decoderResult.getText();
    }


    public static String decodeBarcodeFromStreamWithScale(InputStream inputStream, int scale) {
        Bitmap bitmap = null;
        try {
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int len;
            while ((len = inputStream.read(buffer)) > 0) {
                byteArrayOutputStream.write(buffer, 0, len);
            }
            byteArrayOutputStream.flush();
            byte[] data = byteArrayOutputStream.toByteArray();

            BitmapFactory.Options options = new BitmapFactory.Options();
            options.inJustDecodeBounds = true;
            BitmapFactory.decodeByteArray(data, 0, data.length, options);

            int imageWidth = options.outWidth;
            int imageHeight = options.outHeight;

            int reqWidth = imageWidth / scale;
            int reqHeight = imageHeight / scale;
            int scaleFactor = Math.min(imageWidth / reqWidth, imageHeight / reqHeight);

            options.inJustDecodeBounds = false;
            options.inSampleSize = scaleFactor;
            bitmap = BitmapFactory.decodeByteArray(data, 0, data.length, options);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        int[] pixels = new int[bitmap.getWidth() * bitmap.getHeight()];
        bitmap.getPixels(pixels, 0, bitmap.getWidth(), 0, 0, bitmap.getWidth(), bitmap.getHeight());
        RGBLuminanceSource source = new RGBLuminanceSource(bitmap.getWidth(), bitmap.getHeight(), pixels);
        BinaryBitmap binaryBitmap = new BinaryBitmap(new HybridBinarizer(source));

        MultiFormatReader multiFormatReader = new MultiFormatReader();
        Result decoderResult;
        try {
            decoderResult = multiFormatReader.decode(binaryBitmap);
        } catch (NotFoundException e) {
            throw new RuntimeException(e);
        }

        return decoderResult.getText();
    }

    public static String decodeBarcodeFromStream3(InputStream inputStream, int scale) {
        Bitmap bitmap = null;
        try {
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int len;
            while ((len = inputStream.read(buffer)) > 0) {
                byteArrayOutputStream.write(buffer, 0, len);
            }
            byteArrayOutputStream.flush();
            byte[] data = byteArrayOutputStream.toByteArray();

            BitmapFactory.Options options = new BitmapFactory.Options();
            options.inJustDecodeBounds = true;
            BitmapFactory.decodeByteArray(data, 0, data.length, options);

            int imageWidth = options.outWidth;
            int imageHeight = options.outHeight;

            int reqWidth = imageWidth / scale;
            int reqHeight = imageHeight / scale;
            int scaleFactor = Math.min(imageWidth / reqWidth, imageHeight / reqHeight);

            options.inJustDecodeBounds = false;
            options.inSampleSize = scaleFactor;
            bitmap = BitmapFactory.decodeByteArray(data, 0, data.length, options);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // Convert the bitmap to a binary image for barcode recognition
        int[] pixels = new int[bitmap.getWidth() * bitmap.getHeight()];
        bitmap.getPixels(pixels, 0, bitmap.getWidth(), 0, 0, bitmap.getWidth(), bitmap.getHeight());
        RGBLuminanceSource source = new RGBLuminanceSource(bitmap.getWidth(), bitmap.getHeight(), pixels);
        BinaryBitmap binaryBitmap = new BinaryBitmap(new HybridBinarizer(source));

        // Read the barcode from the binary image
        MultiFormatReader multiFormatReader = new MultiFormatReader();
        multiFormatReader.setHints(new HashMap<DecodeHintType, Object>() {{
            put(DecodeHintType.TRY_HARDER, Boolean.TRUE);
            put(DecodeHintType.POSSIBLE_FORMATS, EnumSet.allOf(BarcodeFormat.class));
        }});

        Result result = null;
        try {
            result = multiFormatReader.decodeWithState(binaryBitmap);
        } catch (NotFoundException e) {
            // Try again with rotated image
            for (int i = 0; i < 3; i++) {
                binaryBitmap.rotateCounterClockwise();
                try {
                    result = multiFormatReader.decodeWithState(binaryBitmap);
                    break;
                } catch (NotFoundException ex) {
                    // continue
                }
            }
        } finally {
            multiFormatReader.reset();
        }

        return result.getText();
    }

}
