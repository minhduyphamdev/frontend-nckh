import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import Styled from './style';
import InputTags from '../../../components/User/InputTags/InputTags';
import { createArticle, getArticleByDOI } from '../../../api/Article';
import { getTag } from '../../../api/Tag';
import { getAllLecturers } from '../../../api/Lecturer';
import httpStatus from 'http-status';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import AuthorTag from '../../../components/User/AuthorTag/AuthorTag';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoaderLayer from '../../../components/LoaderLayer/LoaderLayer';
import FileUpload from '../../../components/FileUpload';

const { Search } = Input;

type OptionSelect = {
  value: number;
  label: string;
};

type OptionSelectString = {
  value: string;
  label: string;
};

const journalOptionList: OptionSelect[] = [
  {
    value: 1,
    label: 'Tạp chí'
  },
  {
    value: 2,
    label: 'Hội nghị'
  }
];

const journalRank: OptionSelectString[] = [
  {
    value: 'Q1',
    label: 'Q1'
  },
  {
    value: 'Q2',
    label: 'Q2'
  },
  {
    value: 'Q3',
    label: 'Q3'
  },
  {
    value: 'Q4',
    label: 'Q4'
  }
];

const conferenceRank: OptionSelectString[] = [
  {
    value: 'A++',
    label: 'A++'
  },
  {
    value: 'A+',
    label: 'A+'
  },
  {
    value: 'A',
    label: 'A'
  },
  {
    value: 'B',
    label: 'B'
  },
  {
    value: 'C',
    label: 'C'
  },
  {
    value: 'Unranked',
    label: 'Unranked'
  }
];

const CreateArticle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const accountId: string | null = localStorage.getItem('accountId');
  const lecturerId: string | null = localStorage.getItem('lecturerId');
  const role = localStorage.getItem('role');

  const [DOI, setDOI] = useState('');
  const [name, setName] = useState('');

  const [journalOption, setJournalOption] = useState<OptionSelect>(journalOptionList[0]);
  const [journalConferenceText, setJournalConferenceText] = useState('');
  const [journal, setJournal] = useState<string | null>();
  const [conference, setConference] = useState<string | null>();
  const [rank, setRank] = useState<OptionSelectString>(journalRank[0]);
  const [rankList, setRankList] = useState<OptionSelectString[]>(journalRank);

  const [volume, setVolume] = useState('');
  const [day, setDay] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [year, setYear] = useState<number>();
  const [abstract, setAbstract] = useState('');
  const [ArXivID, setArXivID] = useState('');
  const [ISBN, setISBN] = useState('');
  const [ISSN, setISSN] = useState('');
  const [PMID, setPMID] = useState('');
  const [Scopus, setScopus] = useState('');
  const [PII, setPII] = useState('');
  const [SGR, setSGR] = useState('');
  const [generalNote, setGeneralNote] = useState('');
  const [citationCount, setCitationCount] = useState(0);
  const [journalUrl, setJournalUrl] = useState('');

  const [tagList, setTagList] = useState<OptionSelect[]>([]);
  const [lecturerList, setLecturerList] = useState<OptionSelect[]>([]);
  const [selectedTag, setSelectedTag] = useState<OptionSelect[]>();
  const [authorFetch, setAuthorFetch] = useState<any[]>([]);

  const [files, setFiles] = useState<any[]>([]);

  const handleGetJournalConference = (e: any) => {
    setJournalConferenceText(e.target.value);
    if (journalOption.value == 1) {
      setJournal(e.target.value);
      setConference(null);
    } else {
      setConference(e.target.value);
      setJournal(null);
    }
  };

  const handleSelectJournalOption = (option: any) => {
    setJournalOption(option);
    if (option.value == 1) {
      setRank(journalRank[0]);
      setRankList(journalRank);
    } else {
      setRank(conferenceRank[0]);
      setRankList(conferenceRank);
    }
  };

  const handleSelectRankOption = (option: any) => {
    setRank(option);
  };

  const handleSelect = (data: any) => {
    setSelectedTag(data);
  };
  const [selectedLecturer, setSelectedLecturer] = useState<OptionSelect[]>();
  const handleSelectLecturer = (data: any) => {
    setSelectedLecturer(data);
  };

  const [authorPayload, setAuthorPayload] = useState<any[]>([]);
  const [tagPayload, setTagPayload] = useState<any[]>([]);

  const fetchTag = async () => {
    const res = await getTag();
    if (res) {
      switch (res.status) {
        case httpStatus.OK: {
          const data = res.data.data;
          let newData: OptionSelect[] = [];
          data.map((item: { id: number; name: string }) => {
            let obj: OptionSelect = { value: item.id, label: item.name };
            newData.push(obj);
          });
          setTagList(newData);
          break;
        }
        case httpStatus.UNAUTHORIZED: {
          navigate('/');
          break;
        }
        default:
          break;
      }
    }
  };

  const fetchLecturer = async () => {
    const res = await getAllLecturers();
    if (res) {
      switch (res.status) {
        case httpStatus.OK: {
          const data = res.data.data;
          let newData: OptionSelect[] = [];
          data.map((item: { id: number; name: string }) => {
            let obj: OptionSelect = { value: item.id, label: item.name };
            newData.push(obj);
          });
          setLecturerList(newData);
          break;
        }
        case httpStatus.UNAUTHORIZED: {
          navigate('/');
          break;
        }
        default:
          break;
      }
    }
  };

  const handleGetArticleByDOI = async () => {
    setIsLoading(true);
    var fullLinkDoi = DOI.includes('doi.org');
    var payload = {};
    if (fullLinkDoi) {
      var doi = DOI.split('doi.org/')[1];
      payload = {
        data: {
          doi: doi
        }
      };
    } else {
      payload = {
        data: {
          doi: DOI
        }
      };
    }

    const res = await getArticleByDOI(payload);
    if (res) {
      setIsLoading(false);
      switch (res.status) {
        case httpStatus.OK: {
          toast.success('Lấy bài báo từ DOI thành công!');
          const data = res.data.data[0];

          setName(data.name);
          if (data.journal) {
            setJournalOption(journalOptionList[0]);
            setJournalConferenceText(data.journal);
            setJournal(data.journal);
            setConference(null);
            setRankList(journalRank);
          } else {
            setJournalConferenceText(data.conference);
            setJournalOption(journalOptionList[1]);
            setRankList(conferenceRank);
            setJournal(null);
            setConference(data.conference);
          }
          setRank({ value: data.rank, label: data.rank });
          setVolume(data.volume);
          setDay(parseInt(data.day));
          setMonth(parseInt(data.month));
          setYear(parseInt(data.year));
          setAbstract(data.abstract);
          setArXivID(data.ArXivID);
          setISBN(data.ISBN);
          setISSN(data.ISSN);
          setPMID(data.PMID);
          setScopus(data.Scopus);
          setPII(data.PII);
          setSGR(data.SGR);
          setGeneralNote(data.generalNote);
          setCitationCount(data.citationCount);
          setJournalUrl(data.journalUrl);

          // tag select
          const tagSelect = data.tags.filter((e: any) => {
            return Object.keys(e).includes('tag_id');
          });

          var listTagSelected: OptionSelect[] = [];
          tagSelect.map((item: any) => {
            var obj: OptionSelect = {
              value: item.tag_id,
              label: item.tag_name
            };
            listTagSelected.push(obj);
          });
          setSelectedTag(listTagSelected);

          //author select
          const temp = data.authors.filter((e: any) => {
            return Object.keys(e).includes('lecturerId');
          });
          var listAuthorSelect: OptionSelect[] = [];
          temp.map((item: any) => {
            if (lecturerId != item.lecturerId) {
              var obj: OptionSelect = {
                value: item.lecturerId,
                label: item.lecturerName
              };
              if (obj.label) {
                listAuthorSelect.push(obj);
              }
            }
          });
          setSelectedLecturer(listAuthorSelect);

          // author tag
          var listTem = data.authors.filter((e: any) => {
            return !Object.keys(e).includes('lecturerId');
          });
          setAuthorFetch(listTem);
          break;
        }
        case httpStatus.UNAUTHORIZED: {
          toast.error('Lấy bài báo từ DOI thất bại!');
          break;
        }
        default:
          break;
      }
    }
  };

  const handleGetAuthor = (list: any) => {
    setAuthorPayload(list);
  };

  const handleGetTag = (list: any) => {
    var tags: any[] = [];
    list?.map((item: string) => {
      let obj = {
        name: item
      };
      tags.push(obj);
    });
    setTagPayload(tags);
  };

  const handleBackSearch = () => {
    navigate('/');
  };

  const handleCreateArticle = async () => {
    var rankPayload: any = rank.value;
    var tags: any[] = [];
    var authors: any[] = [
      {
        lecturerId: parseInt(lecturerId!)
      }
    ];

    selectedTag?.map((item: { value: number; label: string }) => {
      let obj = { tag_id: item.value };
      tags.push(obj);
    });
    tagPayload?.map((item) => [tags.push(item)]);

    selectedLecturer?.map((item: { value: number; label: string }) => {
      let obj = { lecturerId: item.value };
      authors.push(obj);
    });
    authorPayload?.map((item) => {
      authors.push(item);
    });

    var data = {
      name,
      journal,
      conference,
      rank: rankPayload,
      volume,
      day,
      month,
      year,
      abstract,
      ArXivID,
      DOI,
      ISBN,
      ISSN,
      PMID,
      Scopus,
      PII,
      SGR,
      generalNote,
      tags,
      authors
    };

    var bodyFormData = new FormData();

    bodyFormData.append('data', JSON.stringify(data));
    files.forEach((file) => {
      bodyFormData.append('files', file);
    });

    const res = await createArticle(bodyFormData);
    if (res) {
      switch (res.status) {
        case httpStatus.OK: {
          toast.success('Tạo bài báo mới thành công!');
          if (role === '0') {
            navigate('/');
          } else {
            navigate('/my-articles');
          }
          break;
        }
        case httpStatus.UNAUTHORIZED: {
          toast.error('Tạo bài báo thất bại!');
          if (role === '0') {
            navigate('/');
          } else {
            navigate('/profile');
          }
          break;
        }
        default:
          break;
      }
    }
  };

  useEffect(() => {
    fetchTag();
    fetchLecturer();
  }, []);

  return (
    <Styled>
      {isLoading && <LoaderLayer />}
      <div className="header_topbar">
        <div
          className="content_tab_name"
          style={{
            fontSize: '22px',
            margin: '12px',
            fontFamily: 'monospace',
            fontWeight: 'bold'
          }}>
          TẠO BÀI BÁO KHOA HỌC
        </div>
      </div>
      <div className="container">
        <div>
          <div style={{ fontSize: '15px', marginBottom: '5px' }}>Nhập DOI để tìm kiếm bài báo</div>
          <div className="doiInput">
            <Search
              placeholder="DOI"
              value={DOI}
              onChange={(e) => setDOI(e.target.value)}
              onSearch={handleGetArticleByDOI}
              enterButton
            />
          </div>
        </div>

        <TextField
          label="Tên bài báo"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          InputLabelProps={{ style: { fontSize: 15 } }}
          inputProps={{ style: { fontSize: 15 } }}
          size="small"
        />
        <div className="flex">
          <div className="selectInput">
            <Select
              options={journalOptionList}
              value={journalOption}
              styles={{ menu: (provided) => ({ ...provided, zIndex: 9999 }) }}
              onChange={(option) => handleSelectJournalOption(option)}
            />
          </div>
          <TextField
            variant="outlined"
            label={journalOption.label}
            value={journalConferenceText}
            onChange={(e) => handleGetJournalConference(e)}
            InputLabelProps={{ style: { fontSize: 15 } }}
            inputProps={{ style: { fontSize: 15 } }}
            size="small"
            fullWidth
          />
          <div className="selectInput">
            <Select
              options={rankList}
              value={rank}
              onChange={(option) => handleSelectRankOption(option)}
            />
          </div>
        </div>

        <TextField
          label="Volume"
          variant="outlined"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          InputLabelProps={{ style: { fontSize: 15 } }}
          inputProps={{ style: { fontSize: 15 } }}
          size="small"
        />
        <TextField
          label="Abstract"
          variant="outlined"
          value={abstract}
          multiline
          onChange={(e) => setAbstract(e.target.value)}
          InputLabelProps={{ style: { fontSize: 15 } }}
          inputProps={{ style: { fontSize: 15, lineHeight: 1.5 } }}
          size="small"
        />
        <div className="flex-center">
          <TextField
            label="Ngày"
            variant="outlined"
            value={day}
            onChange={(e) => setDay(parseInt(e.target.value))}
            InputLabelProps={{ style: { fontSize: 15 }, shrink: day != undefined }}
            inputProps={{ style: { fontSize: 15 } }}
            size="small"
            fullWidth
            type="number"
          />
          <TextField
            label="Tháng"
            variant="outlined"
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
            InputLabelProps={{ style: { fontSize: 15 }, shrink: month != undefined }}
            inputProps={{ style: { fontSize: 15 } }}
            size="small"
            fullWidth
            type="number"
          />
          <TextField
            label="Năm"
            variant="outlined"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            InputLabelProps={{ style: { fontSize: 15 }, shrink: year != undefined }}
            inputProps={{ style: { fontSize: 15 } }}
            size="small"
            fullWidth
          />
        </div>

        <div className="flex">
          <TextField
            label="ArXivID"
            variant="outlined"
            value={ArXivID}
            onChange={(e) => setArXivID(e.target.value)}
            InputLabelProps={{ style: { fontSize: 15 } }}
            inputProps={{ style: { fontSize: 15 } }}
            size="small"
            fullWidth
          />

          <TextField
            label="PMID"
            variant="outlined"
            value={PMID}
            onChange={(e) => setPMID(e.target.value)}
            InputLabelProps={{ style: { fontSize: 15 } }}
            inputProps={{ style: { fontSize: 15 } }}
            size="small"
            fullWidth
          />
        </div>

        <div className="flex">
          <TextField
            label="ISBN"
            variant="outlined"
            value={ISBN}
            onChange={(e) => setISBN(e.target.value)}
            InputLabelProps={{ style: { fontSize: 15 } }}
            inputProps={{ style: { fontSize: 15 } }}
            size="small"
            fullWidth
          />
          <TextField
            label="ISSN"
            variant="outlined"
            value={ISSN}
            onChange={(e) => setISSN(e.target.value)}
            InputLabelProps={{ style: { fontSize: 15 } }}
            inputProps={{ style: { fontSize: 15 } }}
            size="small"
            fullWidth
          />
        </div>

        <div className="flex">
          <TextField
            label="PII"
            variant="outlined"
            value={PII}
            onChange={(e) => setPII(e.target.value)}
            InputLabelProps={{ style: { fontSize: 15 } }}
            inputProps={{ style: { fontSize: 15 } }}
            size="small"
            fullWidth
          />
          <TextField
            label="SGR"
            variant="outlined"
            value={SGR}
            onChange={(e) => setSGR(e.target.value)}
            InputLabelProps={{ style: { fontSize: 15 } }}
            inputProps={{ style: { fontSize: 15 } }}
            size="small"
            fullWidth
          />
        </div>

        <TextField
          label="Ghi chú"
          variant="outlined"
          value={generalNote}
          onChange={(e) => setGeneralNote(e.target.value)}
          InputLabelProps={{ style: { fontSize: 15 } }}
          inputProps={{ style: { fontSize: 15 } }}
          size="small"
        />

        <div>
          <div className="titleTag">Chọn hoặc thêm mới tag</div>
          <div className="selectInputFull">
            <Select
              options={tagList}
              placeholder="Chọn tag"
              value={selectedTag}
              onChange={handleSelect}
              isSearchable={true}
              isMulti
            />
          </div>
        </div>

        <div>
          <div className="titleTag">Chọn hoặc thêm mới tác giả</div>
          <div className="selectInputFull">
            <Select
              options={lecturerList}
              placeholder="Chọn tác giả"
              value={selectedLecturer}
              onChange={handleSelectLecturer}
              isSearchable={true}
              isMulti
            />
          </div>
          <div style={{ marginTop: '20px' }}>
            <AuthorTag data={authorFetch} handleGetInputTag={handleGetAuthor} />
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <FileUpload files={files} setFiles={setFiles} />
          {files.map((file, index) => (
            <p className="file" key={index}>
              {file.name}
            </p>
          ))}
        </div>

        <div className="btnContainer">
          <Button size="large" variant="outlined" onClick={() => handleBackSearch()}>
            Hủy
          </Button>
          <Button size="large" variant="contained" onClick={() => handleCreateArticle()}>
            Lưu
          </Button>
        </div>
      </div>
    </Styled>
  );
};

export default CreateArticle;
