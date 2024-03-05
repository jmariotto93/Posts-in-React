import './styles.css';
import { Component } from 'react'
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Footer } from '../../components/Footer';

class Home extends Component {
  state = {
      posts: [],
      allPosts: [],
      page: 0,
      postsPerPage: 8,
      searchValue: ''
    }

  componentDidMount() {
    this.loadPosts()
  }

  loadPosts = async () => {
   const { page, postsPerPage} = this.state;

   const postsResponse =  fetch ('https://jsonplaceholder.typicode.com/posts')
   const photoResponse = fetch('https://jsonplaceholder.typicode.com/photos');
   
   const [posts, photo] = await Promise.all([postsResponse, photoResponse]);
   
   const postsJson = await posts.json();
   const photoJson = await photo.json();

   const postsAndPhotos = postsJson.map((post, index) => {
    return {...post, cover: photoJson[index].url}
   });

   this.setState({ 
    
    posts: postsAndPhotos.slice(page, postsPerPage),
    allPosts: postsAndPhotos

  } )
  }
  loadMorePosts = () => {
    const { 
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({posts, page: nextPage});
  }

  handleChange = (e) => {
    const {value} = e.target;
    this.setState({searchValue: value})
  }
  render() {
    const { posts,page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
      : posts;
    return (
      <section className='container'>
          <div className='search-container'>
            {!!searchValue && (
              
                <h1>Search: {searchValue}</h1>
            )}
            <Input 
              value={searchValue}
              onChange={this.handleChange}
            />
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
                onClick={this.loadMorePosts}
              />
            )}
            
          </div>

          <Footer text={"©José Mariotto 2024"}/>
      </section>
      
    );
    }
}
export default Home;