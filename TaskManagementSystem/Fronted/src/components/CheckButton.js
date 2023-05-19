import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/modules/todoItem.module.scss';

const checkVariants = {
  initial: {
    color: '#fff',
  },
  checked: {
    pathLength: 1,
  },
  unchecked: {
    pathLength: 0,
  },
};

const boxVariants = {
  checked: {
    background: 'var(--primaryPuple)',
    transtion: { duration: 0.1 },
  },
  unchecked: {
    background: 'var(--gray-1)',
    transition: {
      duration: 0.1,
    },
  },
};

function CheckButton({ checked, setChecked }) {
  return (
    <motion.div
      className={styles.svgBox}
      variants={checkVariants}
      animate={checked ? 'checked' : 'unchecked'}
      onClick={() => console.log('Being checked')}
    >
      <motion.svg
        className={styles.svg}
        viewBox="0 0 53 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          fill="none"
          strokeMiterlimit="10"
          strokeWidth="6"
          d="M1.5 22L16 36.5L51.5 1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  );
}

export default CheckButton;
