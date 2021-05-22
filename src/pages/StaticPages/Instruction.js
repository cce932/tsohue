import React from "react"
import styled from "styled-components"

import "shared/style/vip.scss"
import { StrokeSpan, StyledP } from "shared/components/styled"
import color from "shared/style/color"

const VideoWrapperDiv = styled.div`
  background: linear-gradient(
    170deg,
    ${(props) => props.theme.viceLighterColor},
    ${(props) => props.theme.fifthColor}
  );
  text-align: center;
  padding: 122px 0 40px;
`

const WrapperDiv = styled.div`
  margin: 30px 10%;
`

const ItemWrapperDiv = styled.div`
  width: 100%;
  display: flex;
  flex: 0 1 auto;
  flex-wrap: wrap;
`

const StyledDiv = styled.div`
  margin: 15px 30px;
  > * {
    margin-bottom: 10px;
  }
`

const StyledImg = styled.img`
  max-width: ${(props) => props.maxWidth};
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.fifthColor};
`

const webContent = [
  {
    title: "進入烹飪包大全",
    description: "",
    img: "https://previews.dropbox.com/p/thumb/ABJK3CS8pGjIZdbel6ThT7d7vmbdfSnsCWLUMaA3KN-Fsv34_oPjoYyHU5Mwftz1cHUbpWI4-bgbjUfbwibgWZNwn4EMYcT-DvKfVuxoxSSqxZIxZecqp1Jf2bLVjKMonjt5kkhnmXjUmZGlXaPAdqK0TtVs0W8Ou4O3cfxLSp2jYqq76t72Q5AS6eh81oHNhpjgqv8yCzUU6q9sGKILdKEx7nX4V958n4T6UNpmBRu-zc8RuLoIOxOjvb0gShfd1nGxJ6fVe51tgU8-fgYRp_51QPs26PpHdRmga9NWQm4gx5nlNXsYVazmszkGrkwXzcTnxr0tUj0iOcvoZ5VL___3XYBUFUTHXzBQA3OPw3kPTQ/p.jpeg?fv_content=true&size_mode=5",
  },
  {
    title: "點選欲購買的食譜",
    description: "",
    img: "https://previews.dropbox.com/p/thumb/ABIq9Hn9i1xyfVsEEdclowZOqC_IYuQNo8V4QyccsNaSKsoxoWj_WIRHM06LIgYpgrOTD5rysGLmopGlkE-y3ORr_1fQwZs-_hAgl2kl1dELyM7JRbMRoapB_KEUt67Aol-NWhWZ0izeCohw9dTIqBwyprrFf3WbVEE5agOeuuWh32Vr9GfXdVauBSchRQ92E3-lXsrMrY4zJVeEsrFIcPRYtKY1M0ZXYMB9mHOsw7MyDz3xeyvN4AfDR5JXMBEipVUs4pufFF6j2OWTChCA9tMlWJevttulqETQ1MUxw-KlRyGS-BUb0enU0UQ2QQX0u5ZW6i3ZiTFHfuy4rmyznxFPgJ1p5V4V3-Wng5YZ8Fk6iQ/p.jpeg?fv_content=true&size_mode=5",
  },
  {
    title: "加入購物車",
    description: "",
    img: "https://previews.dropbox.com/p/thumb/ABLDhB4E1a1TBsovdbGwaTqc80YLErWJWmnEvzBd2mRnZpCbs_Ra_-9f9BQ0JrC5n04bK4kPGpoymHnthPBm5MIQhd48Vt7pgJalAJuLr1ho9l1YMx1jCgasQttHOlA2vNlAxv35t34hWO-MN8_aRmJ4UVk7sY_2ArOuiRKiVoe8uNMXCBV-HGLIdrqYgXIU-IyHNimS7ruHWzOzRSTPyv2NzNrrLH9Zaawqr2PGXD1bLzZYvOWMLJhVboDPCzGT6lBhshzMtYopbejOAiEzBK06amgl14Z7_QaAp_eaq6XFGXsNNAdcrEp-ZJxxsw6x4m69hAHFN8D9cHeAip_41KTr5IHc68uE3xeIVHub6uVf7g/p.jpeg?fv_content=true&size_mode=5",
  },
  {
    title: "點選訂購",
    description: "",
    img: "https://previews.dropbox.com/p/thumb/ABJACAyAadOU2wa5EkYsezJ0bbrEH_UUxuUi3mzKY60I5fl-k6iSTd1NzqJQMD45fcia4vGckwfupsi08e6cVHQsYlG9yxM2vHuPr1-ECuB2O_2YTeo13qrpxMAWOgGjV5uusijprqaB7WcPKkxxn1ztH7OABsb64YtyBBdjLG1D4shk2Ax9hfzrG5NaG2zNjTQh0iEVBXP_o2Lq7YwwgxmBumYw9xPyWLWVzgVcnuT-PJLIQTkSH4hcB0EZ4at7fC7mcGDaedGwfagOi00Wbja6WRfcU-SdbjO2bZcTuUEitxSUI3NdgJZU5s818IOklAmkBAiytyWWEACVjOC31ESXIxQL0YCPvBqSBqDoQCpRiA/p.jpeg?fv_content=true&size_mode=5",
  },
  {
    title: "下訂單，訂購成功",
    description: "",
    img: "https://previews.dropbox.com/p/thumb/ABJoZV4TFmgB3cKomvuFnxoMyPCVnq1zix118B8lzDIsg5kSvwXojOR0QiHrNUTEnFGzi9FvzkODd6XlsRLAxyZdkkyZHKj0e_GjJHler5khOfGkIKYS6cOsy-uuVLgxtoxh2dw3_XtTDTReh4_GxeDik0v0DGCotgOZ4nUsDIA-0xffiYIFtMmMOtjUp5XP-f-CMiWYxgXM6e33aLAvaeGi1SIMMVxTk_BjgI2KTsrXAhMefzMwkrX3A4DbPGw__u2Gfn78lpg3XbU4st1TKe4tIqWDgO6ivlqXsM_PEyOnSJB07luSerwkjTusg7orpOhyQP9e-WHnwXBVx7UBXxiI8I-Ya12s61YpwL4oeB-L1Q/p.jpeg?fv_content=true&size_mode=5",
  },
  {
    title: "查看訂單",
    description: "訂單狀態於「待確認」時，皆可取消訂單",
    img: "https://previews.dropbox.com/p/thumb/ABJvIu-8UT4ZTdoxWhPlLqgSZxjz9H3jiPnHvdGkbCD8dVxh3dSaJoIdACb_O6BGX6VkO6bMxqHqQriSyLB_hNgVCQFVDc9_Tc5G2hM00hGIjmPsr1QhwCicVyYRkDqcFGVUCVKsAHC79g00l2-cODe1i99Te9ddXwlzzi32DV-dUYdr05zJjJlp_Rvn9ZsI-O5x4wkT0l882RM_4dX_WSzgosg2I8ckAUa2OVyipKBCCZmzzUalP0pxv6hogNV6LyNGkTQy6aFriM7XTBohDyoh6PWlk6w2uxqvNpPQ1dtNcZcvZjekVT9JakpUipzzh5fDi22k7MFlfi_p0oB_Ly-l0C5UT6d7wk0DeiIhfoH4BA/p.jpeg?fv_content=true&size_mode=5",
  },
]

const appContent = [
  {
    title: "進入主頁",
    description: "",
    img: "https://previews.dropbox.com/p/thumb/ABJGX36Oxo7P18iaC2verpszCW3lfiYUM3xUncvDVirus2Wtcnjzqy1mTMLRk3xWdLiwxbU6dDpXdmGQNsrOlR1Carwt_qMeyBeQnD6_gdVgQUM5dG3pOdDiw7mOhLJ7SixCY7YMl6o1OSi92yb50TawzzWpu1z_2Hy6M-YS40uNIen8QbWM0yW7tZ3I2QF6lqeukNDAQzAHf4QbZtVTFt2VCt3chkEUDWMvA-r0tADOsZJQERnxOPPjT6iCfJ12h4IYv7hB6bL8Z-XSSWVrm5VFufRrODGEZb3IzT5ZG96N33YTF9I97YFJSKPQajJvhJwQUiNMMXJEI5x5203HdBvgX3jhpueMSPVO1jXq_mWrtQ/p.png?size=2048x1536&size_mode=3",
  },
  {
    title: "登入後點選訂單總覽",
    description: "",
    img: "https://previews.dropbox.com/p/thumb/ABI48UF8c2A8fbwnUjT6jZLbbGTB6WkyHtd2Zv7jkxQtb_hcL-yb3dF0LQVEHBZL2TXUy6EL-TA4I0j_J83YXeC4cKZO-51YqJl7K60UAxdIF-gyi-LT4Xgu4psu8EN1hApIq0t1XdhM2083XvS_olV-thdVzYd0bBoFdXLPXaBygH1AEPnTDvaIUbYOwXUAs5_t4vJFbvVez0Y3FU7xTSHgn4IVyJ0dRtm_ShyEA3qQXCbNFqv544Yem4MIzfYVzROcB33BGLZey3sHeHC0PEcZWVLRy74AR1GPxOBANtXJCTrwuuCd7_M9G34Hihbly2gMEThnKoMM4vMmgsSDJ6uGZHAxO8n3DqYHEQHvy3heJA/p.png?fv_content=true&size_mode=5",
  },
  {
    title: ["查看訂單詳細", "並點擊欲導覽的食譜"],
    description: "",
    img: "https://previews.dropbox.com/p/thumb/ABJ4JI3arM-PXvSJSUjcK5_LGSDley9BT-fvia4W7_r58rM3J8YptGbpo5SLuscLrsaWYDc6uX3uJIir-aIXPL2b_cYEaQZ-hbJ6_UwJchCPktcmokXDqfHlDwZKUtRUr99aJMpIBWBKMd8-7n-ogftDPdMjHJrtD4J1VHEcteoDGQeuDmFJv9r34lwIjqJ6pQ5r8PNB_LdTYYcZczy8iJzI7-l6mt7Gp879sLmnoX6hDrr3GXO2Mk98cqBCdB_STDegQY1z6p7s52hWOWMvSUAedCcW-Lz_Ssgc-c48ugKPkupjJ17rBZHfVLwo0LEfMGbtJ4F2Wv0g0mZj64ZhEB9KI95tud2Dw_YsILLibXt4kA/p.png?size=2048x1536&size_mode=3",
  },
  {
    title: ["跳轉至食譜詳細頁面", "並點選分頁「食譜影片」"],
    description: "也可以直接由「食譜總覽」進入本頁面喔",
    img: "https://previews.dropbox.com/p/thumb/ABIAbFdgloxuiVLWuDamTBLD6_G8E2cZ4dQqXdTf8eZvqGq5NXquwTBs2sL56njPyWosLHIga5sfvp4cAy8r5fRMNXAKy_CcSNJEcTPC4x3hQpXL2VY5h27ZewhYjBj4u2AUN39koQv6gakuAFd_HlKJXCcQ5sSEcOMqH8aoejV1puZ0x2BWD3M8qvMAc3oRzXlnH4k8cNZ7xXzU_Hhr0Snh4OFjVO8Ab0GrSz_f35_PFU8V4ugPWa5spX8poTfL_I2uOTnZX0y4CuK-zfu2sU0Sr1Sqh_cxHWnoaQbRaOFJQzFTzP52rpO133BlBfQXyNtRCaLPWvKEe-Co0zCIofBT7cSGG6kRCrMbQpVwY6EZKQ/p.png?size=2048x1536&size_mode=3",
  },
  {
    title: "點擊「點我進行影片教學」",
    description: "",
    img: "https://previews.dropbox.com/p/thumb/ABLqQVpXP6u9gbxu449s4F9FV7iSK5Acxw9wgLIjZ_D4AioiWQ1od6YZQwyX2oI_lQRivvf6ue4O-QY3mN-BxqplwnsePY7CtPiG4qjMavBPC263e9Q_iyBWNmqx1qpuoRsTnMvhr_0gxkcm8EL2icENId4mwBYJlui7tv7AJWfbUWGYVhZnei_T6jY6MzgxOGnKbIdjRbPUBCRnET1T2HDXNz9VAlFlb_8rdQMvrtjfsuV23f6br_W-0yBwIH9mSPNtJlxDF31UOw0AKNWXrDK6MzgP0m7ZH5tkzKrXZntZhZoCIXj1qeUzqQGTYAaTn9GC63W7C6AG3hBhMGz-rr5EtMtV5IWGblHixZW0cLAseA/p.png?fv_content=true&size_mode=5",
  },
  {
    title: "開始聲控料理導覽～",
    description: "",
    img: "https://previews.dropbox.com/p/thumb/ABKxYudNTZiE7qH4oZLXIUOVjRdy0zAhkF_NKa4Ertu-hjs_zQfAswnf6HIwjC3KyOpRm01D1IKFbzATqWnjY53XMvCvuCLw3wD4MiJMArg7-oa3bbMiBGtuDA-YpRv5xbyQAhjwlELkyb1aKKmOBZiDSVOwfDCmtE7zLneqHq3xw2e30Tj7XioHUldYqLirPeiuY_F8KVoT3N2Abl4R35TA8hXhp_8BgMhaH7WwMo3hBVIHJ79yFn5MsgLdfplPdEEsbH1P7PI1O50g31tZ7Dm-aki2SrbDQgKKAESTNwEq4PdPzGmDRyzlJWshYCt3hmGwvi3QFk9ygRZUEXcdX5n7j8NrmYZCszMJHx8wrdp-bw/p.png?size=2048x1536&size_mode=3",
    isLandscape: true,
  },
]

const Item = ({ title, description, img, isApp, isLandscape, index }) => (
  <StyledDiv>
    <StyledP
      fontSize="1.3rem"
      weight="bold"
      color={color.prime}
      minHeight={isApp ? "62px" : "auto"}
    >
      {`${index + 1}  `}
      {typeof title === "object"
        ? title.map((t, index) => (
            <>
              {t}
              {index < title.length - 1 && (
                <>
                  <br />
                  &emsp;
                </>
              )}
            </>
          ))
        : title}
    </StyledP>
    {description && (
      <StyledP fontSize="0.9rem" color={color.prime}>
        {description}
      </StyledP>
    )}
    <StyledImg
      src={img}
      maxWidth={isApp ? (isLandscape ? "26vw" : "20vw") : "35vw"}
    />
  </StyledDiv>
)

const Instruction = () => {
  return (
    <div className="instruction">
      <VideoWrapperDiv>
        <iframe
          src="https://easycook-backend.s3.amazonaws.com/order-instruction-1.mp4"
          scrolling="no"
          frameBorder="0"
          width="700"
          height="394"
          allowFullScreen="true"
          webkitAllowFullScreen="true"
          mozAllowFullScreen="true"
          title="order-instruction"
        />
      </VideoWrapperDiv>
      <WrapperDiv>
        <StrokeSpan
          size="1.5rem"
          padding="5px 15px"
          color={color.prime}
          margin="0"
          lineHeight="3"
        >
          Web訂購指南
        </StrokeSpan>
        <ItemWrapperDiv>
          {webContent.map((item, index) => (
            <Item {...{ ...item, isApp: false, index }} />
          ))}
        </ItemWrapperDiv>
        <StrokeSpan
          size="1.5rem"
          padding="5px 15px"
          color={color.prime}
          margin="0"
          lineHeight="3"
        >
          App聲控導覽
        </StrokeSpan>
        <ItemWrapperDiv>
          {appContent.map((item, index) => (
            <Item {...{ ...item, isApp: true, index }} />
          ))}
        </ItemWrapperDiv>
      </WrapperDiv>
    </div>
  )
}

export default Instruction
