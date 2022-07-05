import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Post } from "../../components/Post";
import { subDays, subHours, subMinutes } from "date-fns";
import { v4 as uuidv4 } from "uuid";

import styles from "./index.module.css";

import janeAvatar from "../../assets/jane-avatar.png";
import devonAvatar from "../../assets/devon-avatar.png";
import micahAvatar from "../../assets/micah-avatar.png";
import jennyAvatar from "../../assets/jenny-avatar.png";
import bessieAvatar from "../../assets/bessie-avatar.png";

const posts = [
  {
    id: uuidv4(),
    author: {
      avatarURL: janeAvatar,
      name: "Jane Cooper",
      role: "Dev Front-End",
    },

    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      { type: "link", content: "jane.design/doctorcare" },
      { type: "hashtag", content: "#novoprojeto" },
      { type: "hashtag", content: "#nlw" },
      { type: "hashtag", content: "#rocketseat" },
    ],

    comment: [],

    publishedAt: subHours(new Date(), 1),
  },

  {
    id: uuidv4(),
    author: {
      avatarURL: devonAvatar,
      name: "Devon Lane",
      role: "Dev Front-End",
    },

    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          "Finalmente finalizei meu novo site/portfólio. Foi um baita esafio criar todo o design e codar na unha, mas consegui 💪🏻",
      },
      { type: "link", content: "devonlane.design" },
      { type: "hashtag", content: "#uiux" },
      { type: "hashtag", content: "#userexperience" },
    ],

    comment: [
      {
        id: uuidv4(),
        author: {
          avatarURL: micahAvatar,
          name: "Micah Lane",
          role: "Dev Front-End",
        },
        content: "Muito bom Devon, parabéns!! 👏👏",
        thumbsUp: 3,
        publishedAt: subDays(new Date(), 1),
      },
      {
        id: uuidv4(),
        author: {
          avatarURL: jennyAvatar,
          name: "Jenny Wilson",
          role: "Dev Front-End",
        },
        content: "Adorei seu novo portifa Devon!",
        thumbsUp: 33,
        publishedAt: subHours(new Date(), 3),
      },
      {
        id: uuidv4(),
        author: {
          avatarURL: bessieAvatar,
          name: "Bessie Cooper",
          role: "Dev Front-End",
        },
        content: "💜💜",
        thumbsUp: 3,
        publishedAt: subMinutes(new Date(), 1),
      },
    ],

    publishedAt: subDays(new Date(), 1),
  },
];

export function Dashboard() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar></Sidebar>
        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                comment={post.comment}
                publishedAt={post.publishedAt}
              />
            );
          })}
        </main>
      </div>
    </>
  );
}
