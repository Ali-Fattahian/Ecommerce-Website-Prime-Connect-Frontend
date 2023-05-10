import React from "react";

const Footer = () => {
  return (
    <footer>
      <i className="far fa-copyright" style={{ color: "var(--bs-dark-blue)", transform: 'translateX(10px)' }}></i>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="150"
        height="50"
      >
        <path
          fill="#588b8b"
          d="M21.768,23.4l-5.024,0l-0.992,0l0,11.248l0.992,0l0-5.632l5.024,0q1.216,0,2.016-0.8t0.8-2q0-1.088-0.8-1.936q-0.848-0.88-2.016-0.88z M21.768,28.024l-5.024,0l0-3.632l5.024,0q0.736,0,1.296,0.528q0.528,0.56,0.528,1.296q0,0.752-0.528,1.28q-0.56,0.528-1.296,0.528z M31.38144,28.984l1.2,0q1.216,0,2.016-0.8t0.8-2.016q0-1.072-0.8-1.92q-0.848-0.88-2.016-0.88l-5.008,0l-0.992,0l0,11.232l0.992,0l0-5.616l2.608,0l3.408,5.616l1.2,0z M27.57344,27.992l0-3.616l5.008,0q0.736,0,1.296,0.528q0.528,0.528,0.528,1.264q0,0.768-0.528,1.296q-0.56,0.528-1.296,0.528l-5.008,0z M37.79488,34.616l1.008,0l0-11.248l-1.008,0l0,11.248z M41.31232,34.568l0.992,0l0-6.768q0-1.344,1.024-2.368t2.368-1.024q1.312,0,2.368,1.024q1.008,1.008,1.008,2.368l0,6.768l1.024,0l0-6.768q0-1.376,1.024-2.368q1.024-1.024,2.352-1.024q1.344,0,2.368,1.024t1.024,2.368l0,6.768l0.992,0l0-6.768q0-1.824-1.28-3.104t-3.104-1.28q-1.2,0-2.256,0.656q-1.072,0.672-1.536,1.712q-0.624-1.072-1.68-1.712q-1.104-0.656-2.304-0.656q-1.808,0-3.088,1.28q-1.296,1.296-1.296,3.104l0,6.768z M61.27776,31.528q0-0.768,0.544-1.392q0.544-0.656,1.312-0.656l0.208,0l2.992,0l0-0.992l-2.992,0l-0.208,0q-0.816-0.16-1.336-0.704t-0.52-1.296q0-0.944,0.552-1.496t1.512-0.552l5.44,0l0-1.008l-5.44,0q-1.232,0-2.144,0.912q-0.912,0.88-0.912,2.144q0,0.8,0.304,1.456t0.896,0.944q-0.592,0.432-0.896,1.136t-0.304,1.504q0,1.248,0.912,2.128q0.928,0.928,2.144,0.928l5.44,0l0-1.056l-5.44,0q-0.96,0-1.512-0.544t-0.552-1.456z"
        />
        <path
          fill="#0095f6"
          d="M84.2592,34.6l0-1.008l-2.848,0q-1.984,0-3.328-1.344t-1.344-3.328q0-1.824,1.344-3.136t3.328-1.312l2.848,0l0-1.04l-2.848,0q-2.416,0-4.048,1.6q-1.632,1.584-1.632,3.888q0,2.448,1.632,4.048q1.6,1.632,4.048,1.632l2.848,0z M90.78464,23.4q-1.808,0-3.104,1.296q-1.312,1.312-1.312,3.12l0,2.416q0,1.776,1.312,3.088t3.104,1.312q1.808,0,3.12-1.312q1.296-1.296,1.296-3.088l0-2.416q0-1.824-1.296-3.12t-3.12-1.296z M94.20864,27.816l0,2.416q0,1.456-1.024,2.448q-1.008,0.96-2.4,0.96t-2.384-0.96q-1.024-0.992-1.024-2.448l0-2.416q0-1.344,1.024-2.4q1.024-1.024,2.384-1.024q1.344,0,2.4,1.024q1.024,1.056,1.024,2.4z M97.55008,34.6l0.992,0l0-6.784q0-1.344,1.024-2.4q1.024-1.024,2.368-1.024t2.4,1.024q1.024,1.056,1.024,2.4l0,6.784l0.992,0l0-6.784q0-1.824-1.296-3.12t-3.12-1.296q-1.792,0-3.088,1.296t-1.296,3.12l0,6.784z M108.76352,34.6l0.992,0l0-6.784q0-1.344,1.024-2.4q1.024-1.024,2.368-1.024t2.4,1.024q1.024,1.056,1.024,2.4l0,6.784l0.992,0l0-6.784q0-1.824-1.296-3.12t-3.12-1.296q-1.792,0-3.088,1.296t-1.296,3.12l0,6.784z M120.93696,31.528q0-0.768,0.544-1.392q0.544-0.656,1.312-0.656l0.208,0l2.992,0l0-0.992l-2.992,0l-0.208,0q-0.816-0.16-1.336-0.704t-0.52-1.296q0-0.944,0.552-1.496t1.512-0.552l5.44,0l0-1.008l-5.44,0q-1.232,0-2.144,0.912q-0.912,0.88-0.912,2.144q0,0.8,0.304,1.456t0.896,0.944q-0.592,0.432-0.896,1.136t-0.304,1.504q0,1.248,0.912,2.128q0.928,0.928,2.144,0.928l5.44,0l0-1.056l-5.44,0q-0.96,0-1.512-0.544t-0.552-1.456z M138.7904,34.6l0-1.008l-2.848,0q-1.984,0-3.328-1.344t-1.344-3.328q0-1.824,1.344-3.136t3.328-1.312l2.848,0l0-1.04l-2.848,0q-2.416,0-4.048,1.6q-1.632,1.584-1.632,3.888q0,2.448,1.632,4.048q1.6,1.632,4.048,1.632l2.848,0z M149.10784,23.4l-8.672,0l0,0.976l3.936,0l0,10.256l0.992,0l0-10.256l3.744,0l0-0.976z"
        />
      </svg>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="50"
        className="year-svg"
      >
        <path
          fill="#c8553d"
          d="M21.512,24.568l-6.032,0l0-1.216l6.032,0q1.184,0,1.984,0.928q0.816,0.944,0.816,2.288q0,1.216-0.816,2.112q-0.8,0.912-1.984,0.912l-1.6,0l-1.632,0q-0.72,0-1.28,0.608q-0.528,0.64-0.528,1.392q0,0.896,0.52,1.456t1.288,0.56l6.032,0l0,0.992l-6.032,0q-1.2,0-2-0.832t-0.8-2.176q0-1.216,0.8-2.112q0.816-0.896,2-0.896l1.632,0l1.6,0q0.736,0,1.264-0.64q0.544-0.592,0.544-1.376q0-0.896-0.52-1.448t-1.288-0.552z M30.93344,23.4q-1.808,0-3.104,1.296q-1.312,1.312-1.312,3.12l0,2.416q0,1.776,1.312,3.088t3.104,1.312q1.808,0,3.12-1.312q1.296-1.296,1.296-3.088l0-2.416q0-1.824-1.296-3.12t-3.12-1.296z M34.35744,27.816l0,2.416q0,1.456-1.024,2.448q-1.008,0.96-2.4,0.96t-2.384-0.96q-1.024-0.992-1.024-2.448l0-2.416q0-1.344,1.024-2.4q1.024-1.024,2.384-1.024q1.344,0,2.4,1.024q1.024,1.056,1.024,2.4z M43.58688,24.568l-6.032,0l0-1.216l6.032,0q1.184,0,1.984,0.928q0.816,0.944,0.816,2.288q0,1.216-0.816,2.112q-0.8,0.912-1.984,0.912l-1.6,0l-1.632,0q-0.72,0-1.28,0.608q-0.528,0.64-0.528,1.392q0,0.896,0.52,1.456t1.288,0.56l6.032,0l0,0.992l-6.032,0q-1.2,0-2-0.832t-0.8-2.176q0-1.216,0.8-2.112q0.816-0.896,2-0.896l1.632,0l1.6,0q0.736,0,1.264-0.64q0.544-0.592,0.544-1.376q0-0.896-0.52-1.448t-1.288-0.552z M56.09632,26.456q0,0.768-0.544,1.392q-0.544,0.656-1.312,0.656l-0.208,0l-2.992,0l0,1.008l2.992,0l0.208,0q0.816,0.16,1.336,0.712t0.52,1.304q0,0.944-0.552,1.504t-1.512,0.56l-5.44,0l0,1.008l5.44,0q1.232,0,2.144-0.912t0.912-2.16q0-0.816-0.304-1.472t-0.896-0.944q1.2-0.896,1.2-2.656q0-1.264-0.912-2.144q-0.944-0.944-2.144-0.944l-5.44,0l0,1.072l5.44,0q0.96,0,1.512,0.544t0.552,1.472z"
        />
        <path fill="#0095f6" d="" />
      </svg>
    </footer>
  );
};

export default Footer;
