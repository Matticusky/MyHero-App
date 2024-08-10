import React from "react";
import { Modal, View } from "react-native";
import LottieView from "lottie-react-native";
import { Animations } from "../../assets";
export const Loader = ({ visible, withLoader = false }) => {
  const ANIM_SPEED = 2.0;
  return (
    <Modal transparent={true} onRequestClose={() => null} visible={visible}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: withLoader ? "#00000033" : null,
        }}
      >
        {withLoader ? (
          <LottieView
            speed={ANIM_SPEED}
            style={{ height: 100 }}
            source={Animations.LOADER}
            autoPlay
            loop
          />
        ) : null}
      </View>
    </Modal>
  );
};
