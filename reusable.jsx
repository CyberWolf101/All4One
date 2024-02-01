
const n = '₦'
// noraml hook
export const UseDeleteCategory = () => {
  const [Loading, setLaoding] = useState(false)
  async function handleDeleteCategory() {
    setLaoding(true)

    try {

      swal('', '', '')
      setLaoding(false)
    } catch (error) {
      swal('error', 'An error ocuured, please check your connection', 'info')
      setLaoding(false)
      console.log(error)

    }

  }
  return { handleDeleteCategory, Loading }
}

//single details
export const UseGetSingleAgentDetails = () => {
  const [Loading, setLaoding] = useState(false)
  const [data, setData] = useState({})

  async function handleGetSingleAgentDetails(id) {
    const docRef = doc(db, 'agents_info', id)

    setLaoding(true)

    try {
      const rawData = await getDoc(docRef)
      const main = rawData.data()
      setData(main)
      setLaoding(false)
    } catch (error) {
      swal('error', 'An error ocuured, please check your connection', 'info')
      setLaoding(false)
      console.log(error)

    }

  }
  return { handleGetSingleAgentDetails, data, Loading }
}

//collection
export const UseAllAgents = () => {
  const [Loading, setLaoding] = useState(false)
  const [agents, setAgents] = useState([])

  async function handleGetAllAgents() {
    const collectionRef = collection(db, 'agents_info')

    setLaoding(true)
    try {
      const rawData = await getDocs(collectionRef)
      const allData = (rawData.docs.map((data) => ({ ...data.data(), id: data.id })));

      setAgents(allData)
      setLaoding(false)
    } catch (error) {
      swal('error', 'An error ocuured, please check your connection', 'info')
      setLaoding(false)
      console.log(error)

    }

  }
  return { handleGetAllAgents, data, Loading }
}


// Modal
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
<Modal isOpen={isOpen} onClose={onClose} >
  <ModalOverlay />
  <ModalContent style={{ marginTop: '150px' }}>
    <center className='modalHeader'>
      <ModalHeader><h6>head</h6></ModalHeader>
      <ModalCloseButton />
    </center>
    <ModalBody className='' >
      <center>
        <div className="faint small">
          ex
        </div>
        <br />
      </center>
      <br />

    </ModalBody>
  </ModalContent>

</Modal >


// are you sure?
swal({
  title: 'Are You sure?',
  text: "Delete this ad?",
  icon: "warning",
  buttons: true,
  dangerMode: true,
}).then(async (willDelete) => {
  if (willDelete) {
    await execute()
  } else {
    console.log('cancel')
    setLaoding(false)

  }
})




// SLIDING SHII

function FeaturedAds({ ads, loading }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < ads.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(ads.length - 1);
    }
  };

  if (loading) return <center className='mt-4'><Spinner color='green.500' thickness='3px' emptyColor='gray.400' /></center>;

  return (
    <div>
      {
        userDetails._id === userId && (
          <div>
            <button onClick={() => { onOpen(); setCurrentPost(post) }}>
              <Edit />
            </button>
            <button onClick={() => deletePost(post._id)}
              disabled={loading}
            >
              {loading ? <Spinner colorScheme='red' /> : <Delete />}
            </button>


            {
              post.isVisible ?
                (<button onClick={() => togglePostVisibility(post._id)}
                  disabled={loadingTooogle}
                >
                  {loadingTooogle ? <Spinner colorScheme='blue' /> : <VisibilityOff />}
                </button>) : (
                  <button onClick={() => togglePostVisibility(post._id)}
                    disabled={loadingTooogle}
                  >
                    {loadingTooogle ? <Spinner colorScheme='blue' /> : <Visibility />}
                  </button>
                )
            }
          </div>
        )
      }
    </div>
  );
}

export default FeaturedAds;





//former sure boy
useEffect(() => {
  const removeExpiredPosts = async () => {
    try {
      // Filter out the posts that have reached their expiry date
      const expiredPosts = data.posts.filter(post => post.expiryDate <= Date.now());
      console.log('running update to...', expiredPosts);

      // Delete images associated with expired posts
      const deleteImagePromises = expiredPosts
        .filter(post => post.deletePath && post.img) // Filter expired posts with deletePath and img
        .map(async post => {

          // Reference to the image in Firebase Storage
          const imageRef = ref(storage, post.deletePath);

          // Delete the image
          await deleteObject(imageRef);
          console.log('Deleted image:', post.deletePath);
        });

      // Wait for all image deletion promises to complete

      await Promise.all(deleteImagePromises);

      // Update the document without the expired posts
      const validPosts = data.posts.filter(post => post.expiryDate >= Date.now());
      const agentDocRef = doc(db, 'agents_info', id);
      await updateDoc(agentDocRef, { posts: validPosts });
      console.log('updated', validPosts);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  // Check if data exists and if it contains posts
  if (data && data.posts && data.posts.length > 0) {
    // Check if there is at least one post that has reached its expiry date
    const hasExpiredPosts = data.posts.some(post => post.expiryDate < Date.now());

    if (hasExpiredPosts) {
      // Call the function to remove expired posts
      removeExpiredPosts();
      console.log('has expired posts')

    } else {
      console.log('no expired posts')
    }
  }
}, [data]);

