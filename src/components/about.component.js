import React from "react";
import Modal from "react-responsive-modal";

const AboutPopup = ({ isAboutOpen, closeAbout, ...props }) => {
  return (
    <Modal
      open={isAboutOpen}
      onClose={closeAbout}
      closeOnEsc={true}
      closeOnOverlayClick={true}
      center={true}
      closeIconSize={24}
    >
      <h2 id="haenchsplanner">haenchs planner</h2>

      <ul>
        <li>haenchs planner uses google tasks/calendar as a backend.</li>

        <li>Login with your google account.</li>

        <li>it’s basically a nicer way to organize tasks</li>
      </ul>

      <h2 id="features">Features:</h2>

      <ul>
        <li>
          all basic google tasks features (lists, tasks, notes, sorting ...)
        </li>

        <li>
          task list grouping: on top of Google’s task lists you can organize
          tasklists into groups. To enable this and still use other google tasks
          apps your need to prepent a group abbrevation. In theconfig you can
          associate the abbreviation with a group name. E.g. name a list “W -
          ToDo” and associate W with work. The list TODO will now appear in the
          work group. Other apps will still show it as “w - ToDo”
        </li>

        <li>
          markdown notes: I am a heavy user of the notes feature, which is
          basically a plain Text associated with a task. In henchs planner you
          can write these texts with markdown (git hub flavored). Other apps
          will just show the plain markdown text, which should be readable as
          well - just not as nice as Haench app does it.
        </li>
      </ul>

      <h2 id="buildwith">Build with:</h2>

      <ul>
        <li>react</li>

        <li>react easy State</li>

        <li>Styled components</li>

        <li>styled icons (feather)</li>

        <li>simple mde</li>

        <li>google gapi (Google tasks api)</li>
      </ul>

      <h2 id="futuredevelopment">future development</h2>

      <ul>
        <li>calendar</li>
      </ul>
    </Modal>
  );
};

export default AboutPopup;
