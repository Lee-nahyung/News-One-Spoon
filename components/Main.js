import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate를 import
import './Main.css';

const categories = [
    {
      name: '정치',
      items: [
        '장경태 국회의원이 폭동 사건에 대해 변호 인의 책임을 촉구.',
        '재경포항인 신년인사회에서는 이명박 전 대통령 등 다수의 주요 정치인들이 참석했다.',
        '일본 오사카 거주 이철씨는 중앙정보부 조작 사건으로 옥살이 13년 후 2015년에 재심 결과 무죄 판결을 받았다.',
        '대전시의회 조원휘 의장은 현장방문을 통해 의정활동을 계획하고 있다.',
        '지난해 물류 대란으로 긴장이 높아진 해운업계는 노사 단체와 합의를 이루어 문제를 해결하였다.',
        '대구시는 2030년 개항을 계획하고 있는 군 공항 이전사업에 대한 사업 계획 승인을 받았다.',
        '트럼프는 취임 연설에서 미국의 황금기를 약속했다.',
        '12·3 비상 계엄 사태 이후 의심받는 일부 유튜버들의 소득 신고에 대한 물음이 제기되었다.',
      ],
    },
    {
      name: '경제',
      items: [
        '기보가 인천시와 함께 400억 규모의 협약보증을 공급해 지역 우수 기술중소기업을 지원, 지역경제 활성화 기여.',
        '설날 연휴 동안 굴비 등 고가 상품의 판매량이 감소, 기업의 경영 악화에 따른 소비 부진이 원인으로 분석.',
        '대구시, 군 공항 이전사업에 대해 사업계획을 수립하고 2030년 개항을 목표로 박차가 가해지고 있음.',
        '군포 산본2동 지역사회보장협의체, 취약계층에 대한 미용 서비스가 제공될 수 있도록 업무협약 체결.',
        '인천시, 교통부터 응급의료, 물가 등 12개 분야에 대해 설 연휴 대책을 마련하여 시민들의 안전과 편익을 위함.',
        '화해, 2024 연말결산 결과 파트너 브랜드 20% 증가, K뷰티 브랜드의 경쟁력 선보임.',
        '코헤시티-베리타스, AI 기술과 보안 시장에서 데이터 보안 강자로 도약, 지속적인 투자를 통한 고객 가치 향상 예상.',
        '시흥시, 상반기 1조 1,300억 원을 신속 집행해 민생경제 활성화 및 사업 효율 개선.',
        '경기도, 2025년 설 연휴 종합대책 추진, 상거래 질서 위반 등을 점검하고 지역경제 활성화를 위해 노력.',
        '아웃백, 지난해 가장 많이 팔린 메뉴 발표, 계속적인 특별한 미식 경험을 제공하기 위한 노력을 약속.',
      ],
    },
    {
      name: '사회',
      items: [
        '방송인 하지혜, 라이브커머스 노하우 담긴 저서 베스트셀러 등극하며 지역사회에 공헌.',
        '동서발전, NIA 주관한 초거대 AI 지원사업 성공적 추진.',
        'KUSF, 대학운동부 학생선수 대상으로 두 일간 리더십 교육 진행.',
        '장경태, 체포된 법원 습격자에 대한 경찰의 조사 진행 주장.',
        '삼진제약, 지난해 인천광역시 사회복지협의회에 7000만원 상당 건기식 기부.',
        '강북구, 다문화 사회의 외국인 주민 주거 보호를 위해 9개 언어 스탬프 도입.',
        '에이스침대, ESG 경영 실천하며 지역사회와 상생하려 설 명절 때 쌀 6500포 기부.',
        '하이트진로, 설 명절 기념 취약 계층 대상 나눔 실천.',
        '한세실업, 다문화 가족 지원을 위해 성금·의류 1억 2천만원 기부.',
        '군포의 산본2동 지역사회보장협의체, 취약계층 미용서비스 위한 업무협약 체결.',
      ],
    },
    {
      name: '생활/문화',
      items: [
        '유니드는 적응성과 혁신 중심의 수평적 조직 문화를 위해 인사제도 개편.',
        '고려대, 전라권 학술 콘퍼런스를 통해 동북아 공동 번영에 대한 연구 공유.',
        '홍범식 LG유플러스 사장, 보안과 품질에 대한 고객 중심 접근 강조.',
        '홈플러스, 5060세대에 맞춰 문화센터 강좌 확대.',
        "서울시, 시민들에게 다양한 정원 문화 강좌 제공 계획 '정원의 쓸모' 진행.",
        '청도군의회, 전통시장 브랜드 가치 향상 후 지역경제 회복 기대.',
        '한국교육학술정보원, 헌혈 캠페인을 통해 생명 나눔 문화 확산.',
        'KUSF, 학생선수 리더십 교육을 통해 대학스포츠 문화 개발.',
      ],
    },
    {
      name: 'IT/과학',
      items: [
        '고려대학교의 인문사회통합과학센터(HUSOP)가 전남대 인문학연구원과 함께 "전라권 공동 학술 콘퍼런스"를 개최.',
        "국토교통과학기술진흥원(KAIA)이 'K-City 네트워크 2025' 공모를 실시하여 해외실증 사업에 참여하는 국내 기업을 모집.",
        '120년의 역사를 가진 독일 더모코스메틱 브랜드 유세린, 피부 과학이 녹아든 전문적인 팝업스토어를 강남에 오픈.',
        "동서발전, 디지털플랫폼정부위원회와 과학기술정통신부 주최의 ‘초거대 인공지능(AI) 활용 지원 사업’ 성공적 진행.",
        "국민대학교, 공학, 자연과학, 인문사회, 예체능 등 다양한 분야의 '2024 캡스톤디자인 경진대회' 개최.",
        '구혜선, 카이스트 ‘과학 저널리즘’ 학과 재학 중으로, 과학과 예술의 연결성을 도전하고 체험.',
        "충북대학교 사회과학대학, AI 기업 '레페토AI'와 생성형 AI 기술 활용 협약 체결.",
        "국방대학교, 2025년 안보과정에 12개국 외국군 장교가 입교, 국방·군사전략, 국방과학기술 등 교육을 받게 됨.",
        '코스맥스, 일본 스킨케어 시장 공략 확대 차원에서 "아름다움의 과학"을 콘셉트로 "코스메위크 2025" 성료.',
        '국회입법조사처, 아동·청소년 SNS 규제에 대해 과학적 증거에 기반한 신중한 논의를 촉구.',
      ],
    },
  ];

function Main() {
    const navigate = useNavigate(); // useNavigate 훅 호출
    const handleMoreClick = (categoryName, items) => {
        navigate(`/details/${categoryName}`, { state: { categoryName, items } });

  };
    
  return (
    <div className="main">
      <h2>카테고리별 랭킹 뉴스</h2>
      <div className="category-container">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
             <h3>
              {category.name}
              <span
                className="more-link"
                onClick={() => handleMoreClick(category.name, category.items)}
              >
                더보기+
              </span>
            </h3>
            <ul>
            {category.items.slice(0, 5).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
