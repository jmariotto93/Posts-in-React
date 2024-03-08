import './styles.css';

import { useCallback, useEffect, useState } from 'react'

import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Footer } from '../../components/Footer';

export const Home = () => {
  
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
      : posts;
  

  const loadPosts = useCallback(async (page, postsPerPage) => {
     
        const postsResponse =  fetch ('https://jsonplaceholder.typicode.com/posts')
        const photoResponse = fetch('https://jsonplaceholder.typicode.com/photos');
        
  const [posts, photo] = await Promise.all([postsResponse, photoResponse]);
        
        const postsJson = await posts.json();
        const photoJson = await photo.json();
     
        const postsAndPhotos = postsJson.map((post, index) => {
         return {...post, cover: photoJson[index].url}
        });
     
        setPosts(postsAndPhotos.slice(page, postsPerPage));
        setAllPosts(postsAndPhotos);
  }, [])
  
  useEffect(() => {
    console.log(new Date().toLocaleDateString('pt-br'))
      loadPosts(0, postsPerPage);
  }, [loadPosts, postsPerPage]);

  const loadMorePosts = () => {
    
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    
    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (e) => {
    const {value} = e.target;
    setSearchValue(value)
  }

  return (

    <section className='container'>
        <div className='search-container'>
          {!!searchValue && (
            
              <h1>Search: {searchValue}</h1>
          )}
          <Input 
            value={searchValue}
            onChange={handleChange}/>
        </div>
        {filteredPosts.length > 0 ? 
          ( <Posts posts={filteredPosts}/> )
          : 
          ( <p>Nenhum post encontrado.</p> )
        }
        <div className='button-container'>
          {!searchValue && (
            <Button 
              disabled={noMorePosts}
              text={'Load more posts'}
              onClick={loadMorePosts} />
          )}
        </div>
        <Footer text={"©José Mariotto 2024"}/>
    </section>
    
  );
}

// class Home2 extends Component {
  

  // componentDidMount() {
  //   this.loadPosts()
  // }

  // loadPosts = async () => {
  //  const { page, postsPerPage} = this.state;

  //  const postsResponse =  fetch ('https://jsonplaceholder.typicode.com/posts')
  //  const photoResponse = fetch('https://jsonplaceholder.typicode.com/photos');
   
  //  const [posts, photo] = await Promise.all([postsResponse, photoResponse]);
   
  //  const postsJson = await posts.json();
  //  const photoJson = await photo.json();

  //  const postsAndPhotos = postsJson.map((post, index) => {
  //   return {...post, cover: photoJson[index].url}
  //  });

  //  this.setState({ 
    
  //   posts: postsAndPhotos.slice(page, postsPerPage),
  //   allPosts: postsAndPhotos

  // } )
  // }
  // loadMorePosts = () => {
  //   const { 
  //     page,
  //     postsPerPage,
  //     allPosts,
  //     posts
  //   } = this.state;

  //   const nextPage = page + postsPerPage;
  //   const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
  //   posts.push(...nextPosts);

  //   this.setState({posts, page: nextPage});
  // }

  // handleChange = (e) => {
  //   const {value} = e.target;
  //   this.setState({searchValue: value})
  // }
  // render() {
  //   const { posts, page, postsPerPage, allPosts, searchValue} = this.state;


  //   const filteredPosts = !!searchValue ? 
  //   allPosts.filter(post => {
  //       return post.title.toLowerCase().includes(searchValue.toLowerCase());
  //     })
  //     : posts;
      
    
  //   }
// }
 export default Home;