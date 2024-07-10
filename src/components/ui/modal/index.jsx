import { useContext } from 'react';
import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material';
import { ShareContext } from "../../shared/context/share-state";
import CloseIcon from '@mui/icons-material/Close';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: '500px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const GenericModal = () => {
  const { openModal, setOpenModal } = useContext(ShareContext);
  const handleClose = () => setOpenModal(false);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Box className="d-flex">
              <Typography id="transition-modal-title" variant="h6" component="h2">
                This project serves as a practice to further ehnance my skills in web development
              </Typography>
              <CloseIcon className="close-icon" onClick={handleClose} />
            </Box>
           
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              This simple pokedex does not include all information about your pokemon. This is solely for educational and entertainment purposes only. 
              <br /><br />
              The pokedex only include information about the pokemon:
              <br />
              <br />
              Names and Pokemon Images.
              <br />
              Base Stats and Abilities.
              <br />
              <br />
              The pokedex does not work offline, so all data in this pokedex are coming from PokeAPI which serves all of the pokemon data.
              <br />
              <br />
              Disclaimer:
              <br />
              This is not related or affiliated to the Pokemon Company in any way. All images used in this app belongs to the rightful owner.
              <br /><br/>
              No Copyright Infringement Intended.
              <br /><br />
              Jonathan De Ocampo
              <br />
              -Developer
              <br />
              <br />
              To access the github repository, <a href='https://github.com/JPDeOcampo/react-pokedex' target='_blank' >Click Here</a>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default GenericModal;
