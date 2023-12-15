import React, { useState } from 'react';
function Details() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleClick = (foods) => {
    setSelectedFood(foods);
    setShowModal(true);
  };
  return (
    <>
      <div
        className='modal fade'
        id='exampleModal'
        tabindex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div
          className='modal-dialog modal-dialog-centered middleModal '
          role='document'
        >
          <div className='modal-content middleContent'>
            <div className='modal-header modalHead'>
              <button className='mclose'>
                <span className='mspan'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='#e3e3e3'
                      d='M18.3,5.71a1,1,0,0,0-1.41,0L12,10.59,7.11,5.7A1,1,0,0,0,5.7,7.11L10.59,12,5.7,16.89A1,1,0,0,0,7.11,18.3L12,13.41l4.89,4.89a1,1,0,0,0,1.41-1.41L13.41,12,18.3,7.11A1,1,0,0,0,18.3,5.71Z'
                    ></path>
                  </svg>
                </span>
                <span className='span2'></span>
              </button>
            </div>
            <div className='modal-body mmiddle'>
              <div className='mmiddle2'>
                <div className='mmiddle3'>
                  <span>
                    <span className='mlove'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 20.483 18.921'
                      >
                        <path
                          d='M9.717,17.815c18.469-12.169,6.023-22.376,0-15.7C3.695-4.561-8.752,5.645,9.717,17.815Z'
                          transform='translate(0.524 0.507)'
                          fill='none'
                          stroke='#ea1f4d'
                          stroke-width='1'
                          fill-rule='evenodd'
                        ></path>
                      </svg>
                    </span>
                  </span>
                </div>
                <div className='mword'>
                  <a className='amword2' href='www.google.com'>
                    <picture>
                      <img
                        src='https://menu.am/resources/default/img/restaurants/big/1676525821737-2653.jpg'
                        alt='this is it'
                        className='inimage'
                      />
                    </picture>
                    <span className='mchina'>Made in China</span>
                  </a>
                  <div className='mtitle'>Pad Thai</div>
                  <div className='mprice'>
                    <div className='mrprice'>
                      <span className='mrprice2'>2800</span>
                      <span className='mrprice3'>AMD</span>
                    </div>
                    <div className='mcount'>
                      <button className='mminus'>-</button>
                      <div className='mnumber'>
                        <input
                          type='text'
                          maxLength='3'
                          className='mnumber2'
                          value='1'
                        />
                      </div>
                      <button className='mplus'>+</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='modal-body midword'>
                This is how it works here This is how it works here This is how
              </div>
              <div className='mcomment modal-body'>
                <div className='mcomment2'>
                  <div className='mcomment3'>
                    <textarea
                      className='mtextarea'
                      placeholder='Your comments to the order'
                    ></textarea>
                    <textarea className='mtextarea2'></textarea>
                  </div>
                  <p className='mval'>Up-to 200 symbols / 0</p>
                </div>
              </div>
            </div>
            <div className='modal-footer mfoot'>
              <div className='mfoot2'>
                <button className='mfoot3' type='button'>
                  <span className='mcart'>Add to Cart</span>
                  <span className='mcart1'></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Details;