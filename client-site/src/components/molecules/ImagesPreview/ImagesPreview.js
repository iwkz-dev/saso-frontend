import { Image } from 'antd';
import { useState } from 'react';

const ImagesPreview = ({ productName, productImages, height }) => {
  const [visible, setVisible] = useState(false);

  const imagePreview = e => {
    e.stopPropagation();
    setVisible(true);
  };

  return (
    <>
      <Image
        alt={productName}
        preview={{
          visible: false,
        }}
        onClick={e => imagePreview(e)}
        height={height}
        src={
          productImages[0]?.imageUrl || 'https://via.placeholder.com/220x200'
        }
      />
      <div
        style={{
          display: 'none',
        }}
      >
        <Image.PreviewGroup
          preview={{
            visible,
            onVisibleChange: vis => setVisible(vis),
          }}
        >
          {productImages.map(img => (
            <Image key={img.imageUrl} src={img.imageUrl} />
          ))}
        </Image.PreviewGroup>
      </div>
    </>
  );
};

export default ImagesPreview;
