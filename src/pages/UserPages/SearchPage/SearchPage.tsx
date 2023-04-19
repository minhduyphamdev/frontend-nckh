import React, { useState, useEffect } from 'react';
import { Form, Tab, Tabs } from 'react-bootstrap';
import ClearIcon from '@mui/icons-material/Clear';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';

import Styled from './style';

export default function SearchPage() {
  const location = useLocation();

  const [searchInput, setSearchInput] = useState<string>(location.state);

  function handleClickArticle() {
    document.getElementById('detail_article')!.classList.add('detail_article_active');
  }

  function handleDeleteDetail() {
    document.getElementById('detail_article')!.classList.remove('detail_article_active');
  }

  const [selected, setSelected] = useState('article');
  const handleChange = event => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };
  const placeholderVal = `Search for ${selected}s...`;

  return (
    <Styled>
      <div className="center">
        <div className="search-radio">
          <Form.Group controlId="kindOfStand" className="search-form-check">
            <p>Search for: </p>
            <Form.Check
              value="article"
              type="radio"
              aria-label="radio 1"
              label="Article"
              onChange={handleChange}
              checked={selected === "article"}
              defaultChecked={true}
            />
            <Form.Check
              value="author"
              type="radio"
              aria-label="radio 2"
              label="Author"
              onChange={handleChange}
              checked={selected === "author"}
            />
          </Form.Group>
        </div>

        <div className="header_article">
          <input
            type="text"
            className="input_search"
            placeholder={placeholderVal}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="btn_search">Tìm kiếm</button>
        </div>

        <div className="content content_article">
          <div className="sort_article">
            <span
              style={{
                marginRight: '20px',
                fontSize: '16px',
                color: '#0056ce',
                fontWeight: 'bolder'
              }}>
              SẮP XẾP
            </span>
            <button className="btn_sort">Liên quan nhất</button>
            <button className="btn_sort">Gần đây nhất</button>
            <button className="btn_sort">Trích dẫn nhiều nhất</button>
          </div>

          <div className="list_article">
            <div className="card_article" onClick={handleClickArticle}>
              <div className="card-top-part">
                <div className="left-part">
                  <div className="user-name">
                    <a className="link_title">
                      <p className="name">A/Prof Anne Prescott</p>
                    </a>
                    <p className="role"> Admin </p>
                  </div>
                  <div className="user-field">
                    Industry Fellow School of International Studies and Education
                  </div>
                  <div className="user-position">
                    <p className="position">
                      Associate Professor Anne Prescott started her career as a secondary school
                      teacher of mathematics. She is currently the coordinator of the primary and
                      secondary mathematics teacher education as well as the Master of Teaching
                      (secondary)
                    </p>
                  </div>
                </div>
                <div className="right-part">
                  <div className="right-part_group">
                    <div className="right-part__num">857</div>
                    <div className="right-part__title">Trích dẫn</div>
                  </div>
                  <div className="right-part_group">
                    <div className="right-part__num">368</div>
                    <div className="right-part__title">Người xem</div>
                  </div>
                </div>
              </div>

              <div className="card-bottom-part">
                <div className="card-bottom-part__group">
                  <FontAwesomeIcon icon={faAdd} />
                  <div className="card-bottom-part__item">Thêm vào thư viện</div>
                </div>
                <div className="card-bottom-part__group">
                  <FontAwesomeIcon icon={faFilePdf} />
                  <div className="card-bottom-part__item">Đăng nhập để xem PDF</div>
                </div>
                <div className="card-bottom-part__group">
                  <FontAwesomeIcon icon={faNewspaper} />
                  <div className="card-bottom-part__item">Liên quan</div>
                </div>
              </div>
            </div>
            <div className="card_article" onClick={handleClickArticle}>
              <div className="card-top-part">
                <div className="left-part">
                  <div className="user-name">
                    <a className="link_title">
                      <p className="name">A/Prof Anne Prescott</p>
                    </a>
                    <p className="role"> Admin </p>
                  </div>
                  <div className="user-field">
                    Industry Fellow School of International Studies and Education
                  </div>
                  <div className="user-position">
                    <p className="position">
                      Associate Professor Anne Prescott started her career as a secondary school
                      teacher of mathematics. She is currently the coordinator of the primary and
                      secondary mathematics teacher education as well as the Master of Teaching
                      (secondary)
                    </p>
                  </div>
                </div>
                <div className="right-part">
                  <div className="right-part_group">
                    <div className="right-part__num">857</div>
                    <div className="right-part__title">Citations</div>
                  </div>
                  <div className="right-part_group">
                    <div className="right-part__num">368</div>
                    <div className="right-part__title">Readers</div>
                  </div>
                </div>
              </div>

              <div className="card-bottom-part">
                <div className="card-bottom-part__group">
                  <FontAwesomeIcon icon={faAdd} />
                  <div className="card-bottom-part__item">Add to library</div>
                </div>
                <div className="card-bottom-part__group">
                  <FontAwesomeIcon icon={faFilePdf} />
                  <div className="card-bottom-part__item">Sign in to view PDF</div>
                </div>
                <div className="card-bottom-part__group">
                  <FontAwesomeIcon icon={faNewspaper} />
                  <div className="card-bottom-part__item">Related</div>
                </div>
              </div>
            </div>
            <div className="card_article" onClick={handleClickArticle}>
              <div className="card-top-part">
                <div className="left-part">
                  <div className="user-name">
                    <a className="link_title">
                      <p className="name">A/Prof Anne Prescott</p>
                    </a>
                    <p className="role"> Admin </p>
                  </div>
                  <div className="user-field">
                    Industry Fellow School of International Studies and Education
                  </div>
                  <div className="user-position">
                    <p className="position">
                      Associate Professor Anne Prescott started her career as a secondary school
                      teacher of mathematics. She is currently the coordinator of the primary and
                      secondary mathematics teacher education as well as the Master of Teaching
                      (secondary)
                    </p>
                  </div>
                </div>
                <div className="right-part">
                  <div className="right-part_group">
                    <div className="right-part__num">857</div>
                    <div className="right-part__title">Citations</div>
                  </div>
                  <div className="right-part_group">
                    <div className="right-part__num">368</div>
                    <div className="right-part__title">Readers</div>
                  </div>
                </div>
              </div>

              <div className="card-bottom-part">
                <div className="card-bottom-part__group">
                  <FontAwesomeIcon icon={faAdd} />
                  <div className="card-bottom-part__item">Add to library</div>
                </div>
                <div className="card-bottom-part__group">
                  <FontAwesomeIcon icon={faFilePdf} />
                  <div className="card-bottom-part__item">Sign in to view PDF</div>
                </div>
                <div className="card-bottom-part__group">
                  <FontAwesomeIcon icon={faNewspaper} />
                  <div className="card-bottom-part__item">Related</div>
                </div>
              </div>
            </div>
            <div className="card_article" onClick={handleClickArticle}>
              <div className="card-top-part">
                <div className="left-part">
                  <div className="user-name">
                    <a className="link_title">
                      <p className="name">A/Prof Anne Prescott</p>
                    </a>
                    <p className="role"> Admin </p>
                  </div>
                  <div className="user-field">
                    Industry Fellow School of International Studies and Education
                  </div>
                  <div className="user-position">
                    <p className="position">
                      Associate Professor Anne Prescott started her career as a secondary school
                      teacher of mathematics. She is currently the coordinator of the primary and
                      secondary mathematics teacher education as well as the Master of Teaching
                      (secondary)
                    </p>
                  </div>
                </div>
                <div className="right-part">
                  <div className="right-part_group">
                    <div className="right-part__num">857</div>
                    <div className="right-part__title">Citations</div>
                  </div>
                  <div className="right-part_group">
                    <div className="right-part__num">368</div>
                    <div className="right-part__title">Readers</div>
                  </div>
                </div>
              </div>

              <div className="card-bottom-part">
                <div className="card-bottom-part__group">
                  <FontAwesomeIcon icon={faAdd} />
                  <div className="card-bottom-part__item">Add to library</div>
                </div>
                <div className="card-bottom-part__group">
                  <FontAwesomeIcon icon={faFilePdf} />
                  <div className="card-bottom-part__item">Sign in to view PDF</div>
                </div>
                <div className="card-bottom-part__group">
                  <FontAwesomeIcon icon={faNewspaper} />
                  <div className="card-bottom-part__item">Related</div>
                </div>
              </div>
            </div>
          </div>

          <div className="detail_article" id="detail_article">
            <div>
              <Tabs defaultActiveKey="info" id="uncontrolled-tab-example" className="mb-4">
                <Tab eventKey="info" title="Info" style={{ fontSize: '12px' }}>
                  <div style={{ paddingRight: '30px' }}>
                    <div className="detail_content">
                      <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
                        The future of bioenergy
                      </div>
                      <div style={{ fontStyle: 'italic', marginTop: '10px' }}>
                        Walter V. ReidMariam K. AliChristopher B. Field Global Change Biology (2020)
                      </div>
                    </div>
                    <hr></hr>
                    <div>
                      <span className="detail_title">LINK</span>
                      <div>
                        <a href="#">
                          https://www.mendeley.com/search/?page=1&query=Bioenergy&sortBy=relevance
                        </a>
                      </div>
                    </div>
                    <hr></hr>
                    <div>
                      <span className="detail_title">ABSTRACT</span>
                      <div className="detail_content">
                        Energy from biomass plays a large and growing role in the global energy
                        system. Energy from biomass can make significant contributions to reducing
                        carbon emissions, especially from difficult-to-decarbonize sectors like
                        aviation, heavy transport, and manufacturing. But land-intensive bioenergy
                        often entails substantial carbon emissions from land-use change as well as
                        production, harvesting, and transportation. In addition, land-intensive
                        bioenergy scales only with the utilization of vast amounts of land, a
                        resource that is fundamentally limited in supply. Because of the land
                        constraint, the intrinsically low yields of energy per unit of land area,
                        land intensive bioenergy makes the most sense. Managing an effective
                        trajectory will require an unusual mix of policies and incentives that
                        encourage appropriate utilization in the short term but minimize lock-in in
                        the longer term.
                      </div>
                    </div>
                    <hr></hr>
                    <div>
                      <span className="detail_title">IDENTIFIERS</span>
                      <div className="detail_content">
                        DOI: 10.1111/gcb.14883 <br></br>
                        ISSN: 13652486
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="related" title="Related">
                  <div className="popup_container">
                    <div className="mini_card_article">
                      <div className="card-top-part">
                        <div className="left-part">
                          <div className="user-name">
                            <a className="link_title">
                              <p className="mini_name">A/Prof Anne Prescott</p>
                            </a>
                            <p className="role"> Admin </p>
                          </div>
                          <div className="user-field">Industry Fellow School</div>
                          <div className="user-position">
                            <p className="position">
                              Associate Professor Anne Prescott started her career as a secondary
                              school teacher of mathematics.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mini_card_article">
                      <div className="card-top-part">
                        <div className="left-part">
                          <div className="user-name">
                            <a className="link_title">
                              <p className="mini_name">
                                Bioenergy production and environmental impactst
                              </p>
                            </a>
                            <p className="role"> Admin </p>
                          </div>
                          <div className="user-field">Industry Fellow School</div>
                          <div className="user-position">
                            <p className="position">
                              Associate Professor Anne Prescott started her career as a secondary
                              school teacher of mathematics.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mini_card_article">
                      <div className="card-top-part">
                        <div className="left-part">
                          <div className="user-name">
                            <a className="link_title">
                              <p className="mini_name">The rise and fall of bioenergy</p>
                            </a>
                            <p className="role"> Admin </p>
                          </div>
                          <div className="user-field">Industry Fellow School</div>
                          <div className="user-position">
                            <p className="position">
                              Associate Professor Anne Prescott started her career as a secondary
                              school teacher of mathematics.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mini_card_article">
                      <div className="card-top-part">
                        <div className="left-part">
                          <div className="user-name">
                            <a className="link_title">
                              <p className="mini_name">A/Prof Anne Prescott</p>
                            </a>
                            <p className="role"> Admin </p>
                          </div>
                          <div className="user-field">Industry Fellow School</div>
                          <div className="user-position">
                            <p className="position">
                              Associate Professor Anne Prescott started her career as a secondary
                              school teacher of mathematics.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mini_card_article">
                      <div className="card-top-part">
                        <div className="left-part">
                          <div className="user-name">
                            <a className="link_title">
                              <p className="mini_name">The rise and fall of bioenergy</p>
                            </a>
                            <p className="role"> Admin </p>
                          </div>
                          <div className="user-field">Industry Fellow School</div>
                          <div className="user-position">
                            <p className="position">
                              Associate Professor Anne Prescott started her career as a secondary
                              school teacher of mathematics.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mini_card_article">
                      <div className="card-top-part">
                        <div className="left-part">
                          <div className="user-name">
                            <a className="link_title">
                              <p className="mini_name">The rise and fall of bioenergy</p>
                            </a>
                            <p className="role"> Admin </p>
                          </div>
                          <div className="user-field">Industry Fellow School</div>
                          <div className="user-position">
                            <p className="position">
                              Associate Professor Anne Prescott started her career as a secondary
                              school teacher of mathematics.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mini_card_article">
                      <div className="card-top-part">
                        <div className="left-part">
                          <div className="user-name">
                            <a className="link_title">
                              <p className="mini_name">A/Prof Anne Prescott</p>
                            </a>
                            <p className="role"> Admin </p>
                          </div>
                          <div className="user-field">Industry Fellow School</div>
                          <div className="user-position">
                            <p className="position">
                              Associate Professor Anne Prescott started her career as a secondary
                              school teacher of mathematics.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mini_card_article">
                      <div className="card-top-part">
                        <div className="left-part">
                          <div className="user-name">
                            <a className="link_title">
                              <p className="mini_name">AThe rise and fall of bioenergy</p>
                            </a>
                            <p className="role"> Admin </p>
                          </div>
                          <div className="user-field">Industry Fellow School</div>
                          <div className="user-position">
                            <p className="position">
                              Associate Professor Anne Prescott started her career as a secondary
                              school teacher of mathematics.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mini_card_article">
                      <div className="card-top-part">
                        <div className="left-part">
                          <div className="user-name">
                            <a className="link_title">
                              <p className="mini_name">A/Prof Anne Prescott</p>
                            </a>
                            <p className="role"> Admin </p>
                          </div>
                          <div className="user-field">Industry Fellow School</div>
                          <div className="user-position">
                            <p className="position">
                              Associate Professor Anne Prescott started her career as a secondary
                              school teacher of mathematics.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
            <ClearIcon
              onClick={handleDeleteDetail}
              style={{
                position: 'absolute',
                fontSize: '22px',
                cursor: 'pointer',
                marginTop: '8px',
                top: '20px',
                right: '20px'
              }}
              className="iconClear"
            />
          </div>
        </div>
      </div>
    </Styled>
  );
}
