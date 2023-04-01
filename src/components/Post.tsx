import { format,formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import {  ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'


import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'

interface Author{
    nome:string; 
    role:string;
    avatarUrl:string;
}

interface Content {
    type: "paragraph" | "link";
    content:string;
}

export interface PostType {
    id:number;
    author:Author;
    publishedAt: Date;
    content:Content[];
}

interface PostProps {
    post:PostType;
}

export function Post({ post }:PostProps) {
    const [comments,setComments] = useState([
        'Post muito bacana',
    ]);

    const [newCommentText,setNewCommentText]= useState('');

    const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:MM'h'",{
        locale:ptBR,
    });

    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt,{
        locale:ptBR,
        addSuffix:true,
    })

    function  handleCreateNewComment(event:FormEvent) {
        event.preventDefault()

        //forma imperativa 
        // const newComment = event.target.comment.value;
        // setComments([...comments, newComment]);
        // event.target.comment.value = '';

        //forma declarativa 
        setComments([...comments, newCommentText]);
        setNewCommentText('');
        
    }

    function handleNewCommentChange (event:ChangeEvent <HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }

    function deleteComment(commentToDelete:string){
        const commentsWithoutDeleteOne = comments.filter(comment =>{
            return comment !== commentToDelete 
        })

        setComments(commentsWithoutDeleteOne);
    }

    function handleNewCommentInvalid(event: InvalidEvent <HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse Campo é obrigatorio.')
    }

    const isNewCommentEmpty = newCommentText.length === 0 ;
    
    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={post.author.avatarUrl} />
                    
                    <div className={styles.authorInfo}>
                        <strong>{post.author.nome}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>
            <div className={styles.content}>   
                {post.content.map(line => {
                    if(line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>
                    } else if (line.type === 'link') {
                        return <p key={line.content}>{line.content}</p>
                    }
                })}    
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}> 
                <strong>Deixe o seu feedback</strong>
                <textarea 
                    name="comment"
                    placeholder="Deixe um comentario"
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    required
                    onInvalid={handleNewCommentInvalid}
                />

                <footer>
                    <button type='submit' disabled={isNewCommentEmpty} >Comentar</button>
                </footer>
                
            </form>
            <div className={styles.commentList}>
                {comments.map(comment =>{
                    return (
                        <Comment 
                            key={comment} 
                            content={comment}
                            onDeleteComment={deleteComment}
                        />
                    )
                })}
              
            </div>
        </article>
    )
}