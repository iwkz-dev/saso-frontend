import React from "react";
import ImageUploading from "react-images-uploading";
import { TiDeleteOutline } from "react-icons/ti";
import styles from "./ImageUploader.module.scss";

const ImageUploader = ({ images, onChange, maxNumber }) => {
    return (
        <div className={styles.uploadImageWrapper}>
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                className={styles.uploadImageWrapper}
                dataURLKey="data_url">
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    // write your building UI
                    <div className="content">
                        <div
                            className={styles.cursorPointer}
                            style={isDragging ? { color: "red" } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}>
                            Click or Drop here
                        </div>
                        <br />
                        {imageList.length ? (
                            <div
                                className={styles.removeAllImages}
                                onClick={onImageRemoveAll}>
                                Remove all images
                            </div>
                        ) : (
                            ""
                        )}
                        <br />
                        <div className={styles.images}>
                            {imageList.map((image, index) => (
                                <div key={index} className={styles.imageItem}>
                                    <div
                                        className="cursor-pointer"
                                        onClick={() => onImageUpdate(index)}>
                                        <img
                                            src={image["data_url"]}
                                            className={styles.image}
                                            alt=""
                                            width="100"
                                        />
                                    </div>
                                    <div
                                        className={styles.removeImage}
                                        onClick={() => onImageRemove(index)}>
                                        <TiDeleteOutline />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </ImageUploading>
        </div>
    );
};

export default ImageUploader;
