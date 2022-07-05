import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { v4 as uuidv4 } from "uuid";

import { Avatar } from "../Avatar";
import { Comment } from "../Comment";

import styles from "./index.module.css";

interface Author {
  name: string;
  role: string;
  avatarURL: string;
}

interface Content {
  type: "paragraph" | "link" | "hashtag" | string;
  content: string;
}

interface Comments {
  id: string;
  author: Author;
  content: string;
  thumbsUp: number;
  publishedAt: Date;
}

interface PostProps {
  author: Author;
  content: Content[];
  comment: Comments[];
  publishedAt: Date;
}

export function Post({ author, content, comment, publishedAt }: PostProps) {
  const [comments, setComments] = useState(comment);
  const [newCommentText, setNewCommentText] = useState("");

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'as' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
  });

  const isNewCommentEmpty = newCommentText.length === 0;

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    const newComment = {
      id: uuidv4(),
      author: {
        avatarURL: "https://github.com/georgaugusto.png",
        name: "Georg Schlegel",
        role: "Web Developer",
      },
      content: newCommentText,
      thumbsUp: 0,
      publishedAt: new Date(),
    };
    setComments([...comments, newComment]);
    setNewCommentText("");
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter((comt) => {
      return comt.id !== commentToDelete;
    });
    setComments(commentsWithoutDeletedOne);
  }

  return (
    <article className={styles.post}>
      <header className={styles.authorHeader}>
        <div className={styles.author}>
          <Avatar src={author.avatarURL} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            );
          } else if (line.type === "hashtag") {
            return (
              <a key={line.content} href="#">
                {line.content}
              </a>
            );
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          value={newCommentText}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
