import { useEffect, useState } from "react";
import Modal from "./Modal";

const images = [
  "https://icongr.am/devicon/angularjs-original.svg?size=100&color=currentColor",
  "https://icongr.am/devicon/apple-original.svg?size=100&color=currentColor",
  "https://icongr.am/devicon/git-original.svg?size=100&color=currentColor",
  "https://icongr.am/devicon/javascript-original.svg?size=100&color=d11f1f",
  "https://icongr.am/devicon/cplusplus-original.svg?size=100&color=currentColor",
  "https://icongr.am/devicon/postgresql-original.svg?size=100&color=currentColor",
  "https://icongr.am/devicon/python-original.svg?size=100&color=currentColor",
  "https://icongr.am/devicon/react-original.svg?size=100&color=currentColor",
  "https://icongr.am/devicon/css3-original.svg?size=100&color=currentColor",
]
  .flatMap((image) => [`a|${image}`, `b|${image}`])
  .sort(() => Math.random() - 0.5);

function Memotest() {
  const [guessed, setGuessed] = useState([]);
  const [selected, setSelected] = useState([]);
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (selected.length === 2) {
      if (selected[0].split("|")[1] === selected[1].split("|")[1]) {
        setGuessed((guessed) => [...guessed, ...selected]);
      }
      setTimeout(() => setSelected([]), 900);
    }
  }, [selected]);

  useEffect(() => {
    if (guessed.length === images.length) {
     setOpenModal(true)
     setGuessed([])
    }
  }, [guessed]);

  return (
    <ul className="grid grid-cols-3 sm:grid-cols-6 gap-3 justify-items-center">
      {!openModal ? images.map((image) => {
        const [, url] = image.split("|");
        return (
          <li
            className="border-4 border-solid border-black rounded-md p-5 cursor-pointer bg-yellow-100"
            key={image}
            onClick={() => {
              selected.length < 2 && 
                setSelected((selected) => [...selected, image]);
              
            }}
          >
            {selected.includes(image) || guessed.includes(image) ? (
              <img src={url} alt="imagen" />
            ) : (
              <img
                src="https://icongr.am/fontawesome/question.svg?size=100&color=currentColor"
                alt="dorso"                
              />
            )}
          </li>
        );
      }): <Modal onClose={() => setOpenModal(false)}/>}
    </ul>
  );
}

export default Memotest;
