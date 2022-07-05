import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { ThumbsUp, Trash } from "phosphor-react";
import { useState } from "react";

import { Avatar } from "../Avatar";

import styles from "./index.module.css";

interface Author {
  name: string;
  role: string;
  avatarURL: string;
}

interface Comments {
  id: string;
  author: Author;
  content: string;
  thumbsUp: number;
  publishedAt: Date;
}

interface CommentProps {
  comment: Comments;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ comment, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState<number>(comment.thumbsUp);

  const publishedDateFormatted = format(
    comment.publishedAt,
    "d 'de' LLLL 'as' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(comment.publishedAt, {
    locale: ptBR,
  });

  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1;
    });
  }

  function handleDeleteComment() {
    onDeleteComment(comment.id);
  }

  return (
    <div className={styles.comment}>
      <Avatar src={comment.author.avatarURL} hasBorder={false} />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{comment.author.name}</strong>
              <time
                title={publishedDateFormatted}
                dateTime={comment.publishedAt.toISOString()}
              >
                {publishedDateRelativeToNow}
              </time>
            </div>

            <button onClick={handleDeleteComment} title="Deletar Comentário">
              <Trash size={24} />
            </button>
          </header>

          <p>{comment.content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
