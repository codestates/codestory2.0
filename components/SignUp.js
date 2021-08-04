import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './signup.module.css';
import axios from 'axios';

export default function SignUp({ signupHandler, loginClick }) {
  
  const serverUrl = 'https://api.codestory.academy';
  const [currentId, setCurrentId] = useState({ value: '', valid: false });
  const [currentPassword, setCurrentPassword] = useState({ value: '', valid: false });
  const [currentPassword2, setCurrentPassword2] = useState({ value: '', valid: false });
  const [validUser, setvalidUser] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (validUser.username !== '' && validUser.password !== '') {
      return createUser();
    }
  },[validUser]);

  const inputId = (e) => {
    const input = e.target.value;
    if (input.length > 2) {
      setCurrentId({ ...currentId, value: input, valid: true });
    } else {
      setCurrentId({ ...currentId, value: input, valid: false });
    }
  };
  
  const inputPassword = (e) => {
    const input = e.target.value;
    if (input.length > 7) {
      setCurrentPassword({...currentPassword, value: input, valid: true});
    } else {
      setCurrentPassword({...currentPassword, value: input, valid: false});
    }
  };

  const inputPassword2 = (e) => {
    const input = e.target.value;
    if (input.length > 7 && currentPassword.value === input) {
      setCurrentPassword2({...currentPassword2, value: input, valid: true});
    } else {
      setCurrentPassword2({...currentPassword2, value: input, valid: false});
    }
  };
  
  const userValidator = () => {
    if (currentId && currentPassword2.valid) {
      return setvalidUser({ ...validUser, username: currentId.value, password: currentPassword2.value });
    } else {
      setErrorMessage('비밀번호가 일치하지 않습니다');
    }
  };
  
  const createUser = async () => {
    const { username, password } = validUser;
    await axios.post(serverUrl+'/user', {
      username: username,
      password: password
    }, {
      'content-type': 'application/json',
      withCredentials: true
    }).then(() => {
      loginClick();
      history.push('/gamestart');
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div id="signup-background">
      <object id="signup-logo" type="image/svg+xml" data="logo.svg" aria-label="logo"></object>
      <div id="signup-container">
        <div id="signup-wrapper">
          <input
            id="signup-input-id"
            value={currentId.value}
            placeholder="아이디 (3자리 이상)"
            onChange={(e) => inputId(e)}
          />
          {
            currentId.valid
              ? <div id="signup-valid">사용할 수 있는 아이디입니다</div>
              : <div id="signup-invalid">아이디를 확인해 주세요</div>
          }
          <input
            className="signup-input-password"
            type='password'
            value={currentPassword.value}
            placeholder="비밀번호 (8자리 이상)"
            onChange={(e) => inputPassword(e)}
          />
          {
            currentPassword.valid
              ? <div id="signup-valid">비밀번호가 유효합니다</div>
              : <div id="signup-invalid">비밀번호를 확인해 주세요</div>
          }
          <input
            className="signup-input-password"
            type='password'
            value={currentPassword2.value}
            placeholder="비밀번호 확인"
            onChange={(e) => inputPassword2(e)}
          />
          {
            currentPassword2.valid
              ? <div id="signup-valid">비밀번호가 유효합니다</div>
              : <div id="signup-invalid">비밀번호를 확인해 주세요</div>
          }
          <button id="signup-btn" onClick={() => userValidator()}>
            회원가입
          </button>
          {
            errorMessage === ''
              ? null
              : <div className="warn-box">{errorMessage}</div>
          }
          <a id="signup-signin" onClick={() => signupHandler()}>이미 아이디가 있으신가요?</a>
        </div>  
      </div>
    </div>
  );
}