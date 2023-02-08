import { getImages } from './shared/api';
import { ColorRing } from 'react-loader-spinner';
import ImageGalleryItem from './modules/ImageGalleryItem';
import ImageGallery from './modules/ImageGallery';
import Searchbar from './modules/Searchbar';
import Modal from './shared/Modal';
import PostDetails from './modules/PostDetails';
import Button from './shared/Button';
import { useState, useEffect, useCallback } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setModal] = useState(false);
  const [postDetails, setDetails] = useState(null);

  const searchImages = useCallback(({ search }) => {
    setSearch(search);
    setImages([]);
  }, []);

  useEffect(() => {
    if (!search) {
      return;
    }
    const fetchImages = async () => {
      try {
        setLoading(true);
        const data = await getImages(search, page);
        setImages(prevImages => [...prevImages, ...data.hits]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [search, page, setLoading, setImages, setError]);

  const loadMore = useCallback(() => {
    setPage(prevState => prevState + 1);
  }, []);

  const showImage = useCallback(({ largeImageURL, tags }) => {
    setModal(true);
    setDetails({ largeImageURL, tags });
  }, []);

  const closeModal = useCallback(() => {
    setModal(false);
    setDetails(null);
  }, []);

  return (
    <>
      <Searchbar onSubmit={searchImages} />
      {error && <p>Error:{error}</p>}
      {loading && (
        <>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </>
      )}
      <ImageGallery>
        <ImageGalleryItem images={images} showImage={showImage} />
      </ImageGallery>
      {images.length > 0 && <Button loadMore={loadMore} />}
      {showModal && (
        <Modal close={closeModal}>
          <PostDetails {...postDetails} />
        </Modal>
      )}
    </>
  );
};
