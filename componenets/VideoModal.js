import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
const VideoModal = ({videoId, setModal, showVideoModal}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showVideoModal}
      onRequestClose={() => {
        setModal(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <YoutubePlayer
            height={'100%'}
            width={'100%'}
            play={false}
            videoId={videoId}
            webViewProps={{
              injectedJavaScript: `
        var element = document.getElementsByClassName('container')[0];
        element.style.position = 'unset';
        element.style.paddingBottom = 'unset';
        true;
      `,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    backgroundColor: 'black',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default VideoModal;
