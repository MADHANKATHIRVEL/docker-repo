"use client";

export default function PropertyPage({ params: { id } }) {
  const puidId = id;
  return (
    <div>
      <div className={style.albion_userId}>
        <h1>Are you sure you want delete</h1>
        <div className={style.albion_user_button}>
          <span className={style.albion_btn_}>Yes</span>
        </div>
      </div>
    </div>
  );
}
