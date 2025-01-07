import styles from "./CreateBtn.module.css";

const CreateBtn = () => {
  return (
    <div className={styles["create-btn-container"]}>
      <button>
        <p>Create</p>
        <p>new</p>
        <p>+</p>
      </button>
    </div>
  );
};

export default CreateBtn;
