import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react';
import { Avatar } from './Avatar'
import styles from './Comment.module.css'


interface CommentsProps {
  content:string;
  onDeleteComment: (comment:string) =>void;
}


export function Comment({content, onDeleteComment}: CommentsProps){
  const [likeCount,setLikeCount] = useState(0);
  
  function handleDeleteComment(){
    onDeleteComment(content);
  }

  function handleLikeComent() {
    setLikeCount(likeCount + 1);
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://avatars.githubusercontent.com/u/40774873?v=4" alt=""/>
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.autorAndTime}>
              <strong>Luiz Siqueira</strong>
              <time title="18 de Maio às 7:30"dateTime="2022-05-12 00:13:20">Cerca de 1h atrás</time>
            </div>

            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>
         
          <p>{content}</p>
        </div>

        <footer>
          <button>
            <ThumbsUp onClick={handleLikeComent} />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>

      </div>
    
    </div>
  )
}

