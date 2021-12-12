import React, { useEffect, useState } from 'react';
import { AiOutlineCopy } from 'react-icons/ai';

import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';

import Input from '../components/Input';
import useHttp from '../hooks/use-http';

import { sendText } from '../api';
import { useClipboard } from 'use-clipboard-copy';

const CapitalizeText = () => {
  const { sendRequest, status, data: text } = useHttp(sendText);
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

  const textHandlerSubmit = (values) => {
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
      <h1>Capitalize My Text</h1>
      <div className="centered">
        <Formik
          initialValues={{
            text: '',
          }}
          validationSchema={sendTextSchema}
          onSubmit={textHandlerSubmit}
        >
          {({ values, handleChange, handleSubmit, handleBlur }) => (
            <form onSubmit={handleSubmit}>
              <Input
                placeholder={'Type Your Word Here to Capitalize It'}
                type="text"
                id="text"
                name="text"
                value={values.text}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="centered errorText">
                <ErrorMessage name="text" />
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
          <input ref={clipboard.target} value={text.text} />
          <button className="btn" onClick={copyClickHandler}>
            {clipboard.copied ? 'Copied' : 'Copy'} <AiOutlineCopy />
          </button>
        </div>
      )}
    </div>
  );
};

export default CapitalizeText;

const sendTextSchema = yup.object().shape({
  text: yup.string().required('Feed me a word'),
});
