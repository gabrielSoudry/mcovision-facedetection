import React, { ReactPortal, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { ChildrenNode } from '../utils/children';
import { createPortal } from 'react-dom';

interface PageOverlayProperties extends Partial<ChildrenNode> {
  image: string;
  title: string;
  desc: string;
  height?: string;
}

const url = "../assets/Accueil.png";
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    backgroundImage: `url('public/Group.svg')`,
    backgroundPosition: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 5000,
  },
  container: {
    width: '660px',
    height: '640px',
    borderRadius: '8px',
    background: 'white',
    overflow: 'hidden',
    filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.25))',
  },
  content: {
    margin: '30px',
    textAlign: 'center',
  },
  contentTitle: {
    color: 'black',
    fontWeight: 500,
  },
  contentText: {
    fontSize: '14px',
    whiteSpace: 'pre-line',
  },
  image: {
    marginLeft: '-5px',
  }
}));

function PageOverlay({ image, title, desc, height, children }: PageOverlayProperties): ReactPortal {
  const classes = useStyles();

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = '';
    };
  }, []);

  return createPortal(
    <div className={classes.root}>
      <div className={classes.container} style={{ height }}>
        <img src={image} className={classes.image} />
        <div className={classes.content}>
          <h2 className={classes.contentTitle}>{title}</h2>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default PageOverlay;
