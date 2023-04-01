import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

import { Post,PostType } from "./components/Post";
import styles from './App.module.css';

import './global.css';

const posts:PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: "https://avatars.githubusercontent.com/u/40774873?v=4",
      nome: "Luiz Siqueira",
      role: "Developer",
    },
    content: [
      {type:"paragraph", content: "Fala galeraa,"},
      {type:"paragraph", content:"Acabei de subir mais um conteudo"},
      {type:"link", content:"/luiz.siqueira"},
    ],
    publishedAt: new Date('2023-03-21 10:00:00'),

  },
  {
    id: 2,
    author: {
      avatarUrl: "https://avatars.githubusercontent.com/u/40774873?v=4",
      nome: "Luiz Siqueira",
      role: "Developer",
    },
    content: [
      {type:"paragraph", content: "Fala galeraa,"},
      {type:"paragraph", content:"Acabei de subir mais um conteudo"},
      {type:"link", content:"/luiz.siqueira"},
    ],
    publishedAt: new Date('2023-03-21 10:00:00'),

  }
]

function App() {
  return (
    <div> 
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post 
                key={post.id}
                post={post}
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}

export default App
