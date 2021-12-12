import React, { useEffect, useState } from 'react';
import { AiOutlineCopy } from 'react-icons/ai';

import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useClipboard } from 'use-clipboard-copy';

import { sendWord } from '../api';
import Input from '../components/Input';
import useHttp from '../hooks/use-http';

const CapitalizeWord = () => {
  const { sendRequest, status, data: word } = useHttp(sendWord);
  const [isShowResult, setIsShowResult] = useState(false);
  const clipboard = useClipboard({
    copiedTimeout: 1000,
    onSuccess() {
      console.log('Text was copied');
    },
    onError() {
      console.log('Failed');
    },
  });

  useEffect(() => {
    if (status === 'completed') {
      setIsShowResult(true);
    }
  }, [status]);

  const wordHandlerSubmit = (values) => {
    sendRequest(values);
  };

  const copyClickHandler = React.useCallback(() => {
    clipboard.copy();
    setTimeout(() => {
      setIsShowResult(false);
    }, 600);
  }, [clipboard]);

  return (
    <div>
      <h1>Capitalize My Word</h1>
      <div className="centered">
        <Formik
          initialValues={{
            word: '',
          }}
          validationSchema={sendSchema}
          onSubmit={wordHandlerSubmit}
        >
          {({ values, handleChange, handleSubmit, handleBlur }) => (
            <form onSubmit={handleSubmit}>
              <Input
                placeholder={'Type Your a Word Here to Capitalize It'}
                type="text"
                id="word"
                name="word"
                value={values.word}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="centered errorText">
                <ErrorMessage name="word" />
              </div>

              {!isShowResult && (
                <button type="submit" className="btn">
                  Capitalize
                </button>
              )}
            </form>
          )}
        </Formik>
      </div>
      {isShowResult && (
        <div className="centered flex input">
          <input ref={clipboard.target} value={word.word} />
          <button className="btn" onClick={copyClickHandler}>
            {clipboard.copied ? 'Copied' : 'Copy'} <AiOutlineCopy />
          </button>
        </div>
      )}
    </div>
  );
};

export default CapitalizeWord;

const sendSchema = yup.object().shape({
  word: yup.string().trim().required('Feed me a word'),
});
