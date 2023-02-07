import { getImages } from './shared/api';
import { ColorRing } from 'react-loader-spinner';
import ImageGalleryItem from './modules/ImageGalleryItem';
import ImageGallery from './modules/ImageGallery';
import Searchbar from './modules/Searchbar';
import Modal from './shared/Modal';
import PostDetails from './modules/PostDetails';
import Button from './shared/Button';
import { useState, useEffect } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setModal] = useState(false);
  const [postDetails, setDetails] = useState(null);

  const searchImages = ({ search }) => {
    setSearch(search);
    setImages([]);
  };

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

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const showImage = ({ largeImageURL, tags }) => {
    setModal(true);
    setDetails({ largeImageURL, tags });
  };

  const closeModal = () => {
    setModal(false);
    setDetails(null);
  };

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

// export class App extends Component {
//   state = {
//     images: [],
//     search: '',
//     loading: false,
//     error: null,
//     page: 1,
//     showModal: false,
//     postDetails: null,
//   };

//   searchImages = ({ search }) => {
//     this.setState({
//       search: search,
//       images: [],
//     });
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { search, page } = this.state;
//     if (prevState.search !== search || prevState.page !== page) {
//       this.fetchImages();
//     }
//   }

//   async fetchImages() {
//     try {
//       const { search, page } = this.state;
//       this.setState({ loading: true });
//       const data = await getImages(search, page);
//       this.setState(prevState => ({
//         images: [...prevState.images, ...data.hits],
//       }));
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ loading: false });
//     }
//   }

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   showImage = ({ largeImageURL, tags }) => {
//     this.setState({
//       showModal: true,
//       postDetails: { largeImageURL, tags },
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       showModal: false,
//       postDetails: null,
//     });
//   };

//   render() {
//     const { images, loading, error, showModal, postDetails } = this.state;
//     const { searchImages, loadMore, showImage, closeModal } = this;
//     return (
//       <>
//         <Searchbar onSubmit={searchImages} />
//         {error && <p>Error:{error}</p>}
//         {loading && (
//           <>
//             <ColorRing
//               visible={true}
//               height="80"
//               width="80"
//               ariaLabel="blocks-loading"
//               wrapperStyle={{}}
//               wrapperClass="blocks-wrapper"
//               colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
//             />
//           </>
//         )}
//         <ImageGallery>
//           <ImageGalleryItem images={images} showImage={showImage} />
//         </ImageGallery>
//         {images.length > 0 && <Button loadMore={loadMore} />}
//         {showModal && (
//           <Modal close={closeModal}>
//             <PostDetails {...postDetails} />
//           </Modal>
//         )}
//       </>
//     );
//   }
// }
