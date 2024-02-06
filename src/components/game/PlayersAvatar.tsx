import React, { FC } from "react";
import Image from "next/image";

const PlayersAvatar: FC<{ key: number; name: string | null }> = ({
  key,
  name,
}) => {
  return (
    <div
      key={key}
      style={{
        width: "100px",
        height: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "20px",
      }}
    >
      <div
        style={{
          borderRadius: "50%",
          backgroundColor: "#fff",
          width: "80px",
          height: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image src="/user/face.svg" alt="avatar" width={80} height={80} />
      </div>
      <p style={{ textAlign: "center", width: "80px" }}>
        {name ? name : "no user yet"}
      </p>
    </div>
  );
};

export default PlayersAvatar;
