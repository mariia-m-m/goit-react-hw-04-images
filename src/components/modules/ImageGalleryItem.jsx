import PropTypes from 'prop-types';
import styles from '../styles.module.css';

const ImageGalleryItem = ({ images, showImage }) => {
  const elements = images.map(({ id, webformatURL, tags, largeImageURL }) => (
    <li
      className={styles.ImageGalleryItem}
      onClick={() => showImage({ largeImageURL, tags })}
      key={id}
    >
      <img
        className={styles.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
    </li>
  ));
  return elements;
};

export default ImageGalleryItem;

ImageGalleryItem.defaultProps = {
  images: [],
};

ImageGalleryItem.propTypes = {
  showImage: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
