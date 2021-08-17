import {
  chakra,
  Flex,
  VisuallyHidden,
  HStack,
  Box,
  Button,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { AccountModel } from "../AccountModel/AccountModel";

function Logo({ width }) {
  const height = (41 / 286) * width;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 286 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.6875 4.76562C5.14062 3.32031 9.67188 2.59766 14.2812 2.59766C18.8906 2.59766 22.4062 3.35938 24.8281 4.88281C25.375 6.60156 25.668 8.24219 25.707 9.80469C25.707 13.4766 24.1836 16.5625 21.1367 19.0625C18.0898 21.5625 14.1836 23.3594 9.41797 24.4531L8.24609 35.1758L3.44141 35.6445L0.6875 4.76562ZM16.4492 11.2109C16.4492 8.75 15.4531 6.91406 13.4609 5.70312C12.9141 5.70312 12.2109 5.82031 11.3516 6.05469L9.71094 21.1719C11.8203 20 13.4609 18.4961 14.6328 16.6602C15.8438 14.8242 16.4492 13.0078 16.4492 11.2109ZM31.9766 35.7031L29.5742 2.24609L39.8281 0.664062L36.7227 35.293L31.9766 35.7031ZM49.5547 36.1133C49.0078 36.1133 48.6172 36.0938 48.3828 36.0547C47.2891 35.3125 46.4102 34.2188 45.7461 32.7734C45.1211 31.3281 44.8086 29.707 44.8086 27.9102C44.8086 26.0742 45.5703 24.707 47.0938 23.8086C48.6562 22.8711 51.5078 22.4023 55.6484 22.4023C57.1719 22.4023 58.793 22.5 60.5117 22.6953L60.3945 21.6406C60.2773 20.3516 59.6719 19.3359 58.5781 18.5938C57.4844 17.8516 56.0781 17.4805 54.3594 17.4805C52.6797 17.4805 51 18.0078 49.3203 19.0625L47.2109 12.1484C49.9453 11.0156 53.0703 10.4492 56.5859 10.4492C60.1016 10.4492 62.875 11.25 64.9062 12.8516C66.9766 14.4141 68.0117 16.875 68.0117 20.2344C68.0117 21.0156 67.9727 21.6211 67.8945 22.0508L66.6055 35.293L61.8008 35.7031L61.0977 28.7891H60.7461C59.6523 31.0938 58.1289 32.8906 56.1758 34.1797C54.2617 35.4688 52.0547 36.1133 49.5547 36.1133ZM60.6875 24.7461L58.168 24.6875C56.0586 24.6875 54.3203 24.8047 52.9531 25.0391C52.5234 25.9375 52.3086 26.7383 52.3086 27.4414C52.3086 28.1445 52.3867 28.8281 52.543 29.4922C52.7383 30.1172 52.9531 30.5273 53.1875 30.7227C57.0156 30.1367 59.5156 28.1445 60.6875 24.7461ZM93.0898 9.86328C93.6758 9.86328 94.2812 9.98047 94.9062 10.2148C96.5469 12.168 97.6602 15.5859 98.2461 20.4688C98.832 25.3516 99.125 30.1953 99.125 35L90.5117 35.7031C90.5117 28.3203 90.2383 21.6211 89.6914 15.6055C85.4336 17.168 82.6016 23.7305 81.1953 35.293L76.4492 35.7031L74.0469 11.9141L84.3008 10.332L83.1875 18.7695H83.6562C84.9453 15.9961 86.3906 13.8281 87.9922 12.2656C89.6328 10.6641 91.332 9.86328 93.0898 9.86328ZM113.891 9.10156C121.625 12.1875 125.492 16.0547 125.492 20.7031C125.492 23.125 124.809 24.8633 123.441 25.918C122.074 26.9727 119.887 27.5 116.879 27.5C113.91 27.5 111.664 27.3242 110.141 26.9727C109.555 28.457 109.242 30.0195 109.203 31.6602C110.648 31.8555 112.66 31.9531 115.238 31.9531C117.816 31.9531 120.59 31.4453 123.559 30.4297L124.965 35.0586C122.621 35.8008 120.004 36.1719 117.113 36.1719C111.918 36.1719 108.109 35.2148 105.688 33.3008C105.18 31.0352 104.926 28.9062 104.926 26.9141C104.926 22.8906 105.805 19.2578 107.562 16.0156C109.359 12.7344 111.469 10.4297 113.891 9.10156ZM111.078 24.7461C111.469 24.7852 112.504 24.8047 114.184 24.8047C115.902 24.8047 117.855 24.5703 120.043 24.1016C120.121 23.5156 120.18 22.9102 120.219 22.2852C120.219 20.3711 119.672 18.5352 118.578 16.7773C115.375 18.8867 112.875 21.543 111.078 24.7461ZM135.336 35.7031L133.285 16.3672L128.832 16.9531L128.539 12.0312L132.758 11.7969L132.055 5.11719L144.008 3.47656L143.012 11.2695L147.816 11.0352L147.641 14.2578L142.543 14.9609L140.082 35.293L135.336 35.7031ZM175.414 3.06641L178.754 27.2656H179.105L186.371 4.53125L190.238 5.64453L195.219 27.4414H195.57L201.137 3.06641L205.414 4.23828L196.918 35L192.641 35.7031L185.258 19.5312L179.809 35L174.535 35.7031L164.457 4.41406L175.414 3.06641ZM213.793 36.1133C213.246 36.1133 212.855 36.0938 212.621 36.0547C211.527 35.3125 210.648 34.2188 209.984 32.7734C209.359 31.3281 209.047 29.707 209.047 27.9102C209.047 26.0742 209.809 24.707 211.332 23.8086C212.895 22.8711 215.746 22.4023 219.887 22.4023C221.41 22.4023 223.031 22.5 224.75 22.6953L224.633 21.6406C224.516 20.3516 223.91 19.3359 222.816 18.5938C221.723 17.8516 220.316 17.4805 218.598 17.4805C216.918 17.4805 215.238 18.0078 213.559 19.0625L211.449 12.1484C214.184 11.0156 217.309 10.4492 220.824 10.4492C224.34 10.4492 227.113 11.25 229.145 12.8516C231.215 14.4141 232.25 16.875 232.25 20.2344C232.25 21.0156 232.211 21.6211 232.133 22.0508L230.844 35.293L226.039 35.7031L225.336 28.7891H224.984C223.891 31.0938 222.367 32.8906 220.414 34.1797C218.5 35.4688 216.293 36.1133 213.793 36.1133ZM224.926 24.7461L222.406 24.6875C220.297 24.6875 218.559 24.8047 217.191 25.0391C216.762 25.9375 216.547 26.7383 216.547 27.4414C216.547 28.1445 216.625 28.8281 216.781 29.4922C216.977 30.1172 217.191 30.5273 217.426 30.7227C221.254 30.1367 223.754 28.1445 224.926 24.7461ZM253.52 19.1797C251.332 19.1797 249.672 19.9414 248.539 21.4648C247.445 22.9883 246.625 25.7812 246.078 29.8438L245.434 35.293L240.688 35.7031L238.285 11.9141L248.539 10.332L247.543 18.0078H247.895C250.473 12.5 253.734 9.57031 257.68 9.21875L256.332 19.4141C255.16 19.2578 254.223 19.1797 253.52 19.1797ZM260.492 19.1797C260.492 15.0781 262.66 11.3281 266.996 7.92969L274.848 13.2617C271.293 15.5273 269.516 17.9102 269.516 20.4102C269.516 21.7383 270.238 23.457 271.684 25.5664C273.168 27.6758 273.91 29.3164 273.91 30.4883C273.91 34.668 271.02 37.9102 265.238 40.2148L263.129 37.3438C265.668 35.9766 266.938 34.4922 266.938 32.8906C266.938 31.25 265.863 29.2383 263.715 26.8555C262.895 25.957 262.152 24.8242 261.488 23.457C260.824 22.0508 260.492 20.625 260.492 19.1797Z"
        fill="url(#paint0_linear)"
      />
      <path
        d="M11.6875 4.76562C16.1406 3.32031 20.6719 2.59766 25.2812 2.59766C29.8906 2.59766 33.4062 3.35938 35.8281 4.88281C36.375 6.60156 36.668 8.24219 36.707 9.80469C36.707 13.4766 35.1836 16.5625 32.1367 19.0625C29.0898 21.5625 25.1836 23.3594 20.418 24.4531L19.2461 35.1758L14.4414 35.6445L11.6875 4.76562ZM27.4492 11.2109C27.4492 8.75 26.4531 6.91406 24.4609 5.70312C23.9141 5.70312 23.2109 5.82031 22.3516 6.05469L20.7109 21.1719C22.8203 20 24.4609 18.4961 25.6328 16.6602C26.8438 14.8242 27.4492 13.0078 27.4492 11.2109ZM42.9766 35.7031L40.5742 2.24609L50.8281 0.664062L47.7227 35.293L42.9766 35.7031ZM60.5547 36.1133C60.0078 36.1133 59.6172 36.0938 59.3828 36.0547C58.2891 35.3125 57.4102 34.2188 56.7461 32.7734C56.1211 31.3281 55.8086 29.707 55.8086 27.9102C55.8086 26.0742 56.5703 24.707 58.0938 23.8086C59.6562 22.8711 62.5078 22.4023 66.6484 22.4023C68.1719 22.4023 69.793 22.5 71.5117 22.6953L71.3945 21.6406C71.2773 20.3516 70.6719 19.3359 69.5781 18.5938C68.4844 17.8516 67.0781 17.4805 65.3594 17.4805C63.6797 17.4805 62 18.0078 60.3203 19.0625L58.2109 12.1484C60.9453 11.0156 64.0703 10.4492 67.5859 10.4492C71.1016 10.4492 73.875 11.25 75.9062 12.8516C77.9766 14.4141 79.0117 16.875 79.0117 20.2344C79.0117 21.0156 78.9727 21.6211 78.8945 22.0508L77.6055 35.293L72.8008 35.7031L72.0977 28.7891H71.7461C70.6523 31.0938 69.1289 32.8906 67.1758 34.1797C65.2617 35.4688 63.0547 36.1133 60.5547 36.1133ZM71.6875 24.7461L69.168 24.6875C67.0586 24.6875 65.3203 24.8047 63.9531 25.0391C63.5234 25.9375 63.3086 26.7383 63.3086 27.4414C63.3086 28.1445 63.3867 28.8281 63.543 29.4922C63.7383 30.1172 63.9531 30.5273 64.1875 30.7227C68.0156 30.1367 70.5156 28.1445 71.6875 24.7461ZM104.09 9.86328C104.676 9.86328 105.281 9.98047 105.906 10.2148C107.547 12.168 108.66 15.5859 109.246 20.4688C109.832 25.3516 110.125 30.1953 110.125 35L101.512 35.7031C101.512 28.3203 101.238 21.6211 100.691 15.6055C96.4336 17.168 93.6016 23.7305 92.1953 35.293L87.4492 35.7031L85.0469 11.9141L95.3008 10.332L94.1875 18.7695H94.6562C95.9453 15.9961 97.3906 13.8281 98.9922 12.2656C100.633 10.6641 102.332 9.86328 104.09 9.86328ZM124.891 9.10156C132.625 12.1875 136.492 16.0547 136.492 20.7031C136.492 23.125 135.809 24.8633 134.441 25.918C133.074 26.9727 130.887 27.5 127.879 27.5C124.91 27.5 122.664 27.3242 121.141 26.9727C120.555 28.457 120.242 30.0195 120.203 31.6602C121.648 31.8555 123.66 31.9531 126.238 31.9531C128.816 31.9531 131.59 31.4453 134.559 30.4297L135.965 35.0586C133.621 35.8008 131.004 36.1719 128.113 36.1719C122.918 36.1719 119.109 35.2148 116.688 33.3008C116.18 31.0352 115.926 28.9062 115.926 26.9141C115.926 22.8906 116.805 19.2578 118.562 16.0156C120.359 12.7344 122.469 10.4297 124.891 9.10156ZM122.078 24.7461C122.469 24.7852 123.504 24.8047 125.184 24.8047C126.902 24.8047 128.855 24.5703 131.043 24.1016C131.121 23.5156 131.18 22.9102 131.219 22.2852C131.219 20.3711 130.672 18.5352 129.578 16.7773C126.375 18.8867 123.875 21.543 122.078 24.7461ZM146.336 35.7031L144.285 16.3672L139.832 16.9531L139.539 12.0312L143.758 11.7969L143.055 5.11719L155.008 3.47656L154.012 11.2695L158.816 11.0352L158.641 14.2578L153.543 14.9609L151.082 35.293L146.336 35.7031ZM186.414 3.06641L189.754 27.2656H190.105L197.371 4.53125L201.238 5.64453L206.219 27.4414H206.57L212.137 3.06641L216.414 4.23828L207.918 35L203.641 35.7031L196.258 19.5312L190.809 35L185.535 35.7031L175.457 4.41406L186.414 3.06641ZM224.793 36.1133C224.246 36.1133 223.855 36.0938 223.621 36.0547C222.527 35.3125 221.648 34.2188 220.984 32.7734C220.359 31.3281 220.047 29.707 220.047 27.9102C220.047 26.0742 220.809 24.707 222.332 23.8086C223.895 22.8711 226.746 22.4023 230.887 22.4023C232.41 22.4023 234.031 22.5 235.75 22.6953L235.633 21.6406C235.516 20.3516 234.91 19.3359 233.816 18.5938C232.723 17.8516 231.316 17.4805 229.598 17.4805C227.918 17.4805 226.238 18.0078 224.559 19.0625L222.449 12.1484C225.184 11.0156 228.309 10.4492 231.824 10.4492C235.34 10.4492 238.113 11.25 240.145 12.8516C242.215 14.4141 243.25 16.875 243.25 20.2344C243.25 21.0156 243.211 21.6211 243.133 22.0508L241.844 35.293L237.039 35.7031L236.336 28.7891H235.984C234.891 31.0938 233.367 32.8906 231.414 34.1797C229.5 35.4688 227.293 36.1133 224.793 36.1133ZM235.926 24.7461L233.406 24.6875C231.297 24.6875 229.559 24.8047 228.191 25.0391C227.762 25.9375 227.547 26.7383 227.547 27.4414C227.547 28.1445 227.625 28.8281 227.781 29.4922C227.977 30.1172 228.191 30.5273 228.426 30.7227C232.254 30.1367 234.754 28.1445 235.926 24.7461ZM264.52 19.1797C262.332 19.1797 260.672 19.9414 259.539 21.4648C258.445 22.9883 257.625 25.7812 257.078 29.8438L256.434 35.293L251.688 35.7031L249.285 11.9141L259.539 10.332L258.543 18.0078H258.895C261.473 12.5 264.734 9.57031 268.68 9.21875L267.332 19.4141C266.16 19.2578 265.223 19.1797 264.52 19.1797ZM271.492 19.1797C271.492 15.0781 273.66 11.3281 277.996 7.92969L285.848 13.2617C282.293 15.5273 280.516 17.9102 280.516 20.4102C280.516 21.7383 281.238 23.457 282.684 25.5664C284.168 27.6758 284.91 29.3164 284.91 30.4883C284.91 34.668 282.02 37.9102 276.238 40.2148L274.129 37.3438C276.668 35.9766 277.938 34.4922 277.938 32.8906C277.938 31.25 276.863 29.2383 274.715 26.8555C273.895 25.957 273.152 24.8242 272.488 23.457C271.824 22.0508 271.492 20.625 271.492 19.1797Z"
        fill="url(#paint1_linear)"
      />
      <path
        d="M5.6875 4.76562C10.1406 3.32031 14.6719 2.59766 19.2812 2.59766C23.8906 2.59766 27.4062 3.35938 29.8281 4.88281C30.375 6.60156 30.668 8.24219 30.707 9.80469C30.707 13.4766 29.1836 16.5625 26.1367 19.0625C23.0898 21.5625 19.1836 23.3594 14.418 24.4531L13.2461 35.1758L8.44141 35.6445L5.6875 4.76562ZM21.4492 11.2109C21.4492 8.75 20.4531 6.91406 18.4609 5.70312C17.9141 5.70312 17.2109 5.82031 16.3516 6.05469L14.7109 21.1719C16.8203 20 18.4609 18.4961 19.6328 16.6602C20.8438 14.8242 21.4492 13.0078 21.4492 11.2109ZM36.9766 35.7031L34.5742 2.24609L44.8281 0.664062L41.7227 35.293L36.9766 35.7031ZM54.5547 36.1133C54.0078 36.1133 53.6172 36.0938 53.3828 36.0547C52.2891 35.3125 51.4102 34.2188 50.7461 32.7734C50.1211 31.3281 49.8086 29.707 49.8086 27.9102C49.8086 26.0742 50.5703 24.707 52.0938 23.8086C53.6562 22.8711 56.5078 22.4023 60.6484 22.4023C62.1719 22.4023 63.793 22.5 65.5117 22.6953L65.3945 21.6406C65.2773 20.3516 64.6719 19.3359 63.5781 18.5938C62.4844 17.8516 61.0781 17.4805 59.3594 17.4805C57.6797 17.4805 56 18.0078 54.3203 19.0625L52.2109 12.1484C54.9453 11.0156 58.0703 10.4492 61.5859 10.4492C65.1016 10.4492 67.875 11.25 69.9062 12.8516C71.9766 14.4141 73.0117 16.875 73.0117 20.2344C73.0117 21.0156 72.9727 21.6211 72.8945 22.0508L71.6055 35.293L66.8008 35.7031L66.0977 28.7891H65.7461C64.6523 31.0938 63.1289 32.8906 61.1758 34.1797C59.2617 35.4688 57.0547 36.1133 54.5547 36.1133ZM65.6875 24.7461L63.168 24.6875C61.0586 24.6875 59.3203 24.8047 57.9531 25.0391C57.5234 25.9375 57.3086 26.7383 57.3086 27.4414C57.3086 28.1445 57.3867 28.8281 57.543 29.4922C57.7383 30.1172 57.9531 30.5273 58.1875 30.7227C62.0156 30.1367 64.5156 28.1445 65.6875 24.7461ZM98.0898 9.86328C98.6758 9.86328 99.2812 9.98047 99.9062 10.2148C101.547 12.168 102.66 15.5859 103.246 20.4688C103.832 25.3516 104.125 30.1953 104.125 35L95.5117 35.7031C95.5117 28.3203 95.2383 21.6211 94.6914 15.6055C90.4336 17.168 87.6016 23.7305 86.1953 35.293L81.4492 35.7031L79.0469 11.9141L89.3008 10.332L88.1875 18.7695H88.6562C89.9453 15.9961 91.3906 13.8281 92.9922 12.2656C94.6328 10.6641 96.332 9.86328 98.0898 9.86328ZM118.891 9.10156C126.625 12.1875 130.492 16.0547 130.492 20.7031C130.492 23.125 129.809 24.8633 128.441 25.918C127.074 26.9727 124.887 27.5 121.879 27.5C118.91 27.5 116.664 27.3242 115.141 26.9727C114.555 28.457 114.242 30.0195 114.203 31.6602C115.648 31.8555 117.66 31.9531 120.238 31.9531C122.816 31.9531 125.59 31.4453 128.559 30.4297L129.965 35.0586C127.621 35.8008 125.004 36.1719 122.113 36.1719C116.918 36.1719 113.109 35.2148 110.688 33.3008C110.18 31.0352 109.926 28.9062 109.926 26.9141C109.926 22.8906 110.805 19.2578 112.562 16.0156C114.359 12.7344 116.469 10.4297 118.891 9.10156ZM116.078 24.7461C116.469 24.7852 117.504 24.8047 119.184 24.8047C120.902 24.8047 122.855 24.5703 125.043 24.1016C125.121 23.5156 125.18 22.9102 125.219 22.2852C125.219 20.3711 124.672 18.5352 123.578 16.7773C120.375 18.8867 117.875 21.543 116.078 24.7461ZM140.336 35.7031L138.285 16.3672L133.832 16.9531L133.539 12.0312L137.758 11.7969L137.055 5.11719L149.008 3.47656L148.012 11.2695L152.816 11.0352L152.641 14.2578L147.543 14.9609L145.082 35.293L140.336 35.7031ZM180.414 3.06641L183.754 27.2656H184.105L191.371 4.53125L195.238 5.64453L200.219 27.4414H200.57L206.137 3.06641L210.414 4.23828L201.918 35L197.641 35.7031L190.258 19.5312L184.809 35L179.535 35.7031L169.457 4.41406L180.414 3.06641ZM218.793 36.1133C218.246 36.1133 217.855 36.0938 217.621 36.0547C216.527 35.3125 215.648 34.2188 214.984 32.7734C214.359 31.3281 214.047 29.707 214.047 27.9102C214.047 26.0742 214.809 24.707 216.332 23.8086C217.895 22.8711 220.746 22.4023 224.887 22.4023C226.41 22.4023 228.031 22.5 229.75 22.6953L229.633 21.6406C229.516 20.3516 228.91 19.3359 227.816 18.5938C226.723 17.8516 225.316 17.4805 223.598 17.4805C221.918 17.4805 220.238 18.0078 218.559 19.0625L216.449 12.1484C219.184 11.0156 222.309 10.4492 225.824 10.4492C229.34 10.4492 232.113 11.25 234.145 12.8516C236.215 14.4141 237.25 16.875 237.25 20.2344C237.25 21.0156 237.211 21.6211 237.133 22.0508L235.844 35.293L231.039 35.7031L230.336 28.7891H229.984C228.891 31.0938 227.367 32.8906 225.414 34.1797C223.5 35.4688 221.293 36.1133 218.793 36.1133ZM229.926 24.7461L227.406 24.6875C225.297 24.6875 223.559 24.8047 222.191 25.0391C221.762 25.9375 221.547 26.7383 221.547 27.4414C221.547 28.1445 221.625 28.8281 221.781 29.4922C221.977 30.1172 222.191 30.5273 222.426 30.7227C226.254 30.1367 228.754 28.1445 229.926 24.7461ZM258.52 19.1797C256.332 19.1797 254.672 19.9414 253.539 21.4648C252.445 22.9883 251.625 25.7812 251.078 29.8438L250.434 35.293L245.688 35.7031L243.285 11.9141L253.539 10.332L252.543 18.0078H252.895C255.473 12.5 258.734 9.57031 262.68 9.21875L261.332 19.4141C260.16 19.2578 259.223 19.1797 258.52 19.1797ZM265.492 19.1797C265.492 15.0781 267.66 11.3281 271.996 7.92969L279.848 13.2617C276.293 15.5273 274.516 17.9102 274.516 20.4102C274.516 21.7383 275.238 23.457 276.684 25.5664C278.168 27.6758 278.91 29.3164 278.91 30.4883C278.91 34.668 276.02 37.9102 270.238 40.2148L268.129 37.3438C270.668 35.9766 271.938 34.4922 271.938 32.8906C271.938 31.25 270.863 29.2383 268.715 26.8555C267.895 25.957 267.152 24.8242 266.488 23.457C265.824 22.0508 265.492 20.625 265.492 19.1797Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="75"
          y1="-12"
          x2="387"
          y2="-7.00001"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#008D85" />
          <stop offset="1" stop-color="#00C2B7" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="86"
          y1="-12"
          x2="398"
          y2="-7.00001"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#BA9C00" />
          <stop offset="1" stop-color="#C28C00" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Navbar({
  address,
  yourBalance,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  web3Modal,
}) {
  // const bg = useColorModeValue("white", "gray.800");
  return (
    <>
      <chakra.header
        bg="black.1000"
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
        zIndex="2"
        position="fixed"
        top="0"
        left="0"
        maxW="100vw"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          mx="auto"
          maxW="1500px"
        >
          <Flex>
            <chakra.a
              href="/"
              title="CredoPay"
              display="flex"
              alignItems="center"
            >
              <Image src="/images/logo.png" height="40px" />
              <VisuallyHidden display="flex" alignItems="center">
                <Logo width={200} />
              </VisuallyHidden>
            </chakra.a>
            <chakra.h1
              display="flex"
              alignItems="center"
              fontSize="xl"
              fontWeight="medium"
              ml="1rem"
            >
              <Logo width={150} />
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            ></HStack>

            {web3Modal ? (
              web3Modal.cachedProvider ? (
                <AccountModel
                  address={address}
                  yourBalance={yourBalance}
                  logoutOfWeb3Modal={logoutOfWeb3Modal}
                />
              ) : (
                <Button
                  colorScheme="teal"
                  bg="brand.600"
                  color="black.1000"
                  _hover={{ bg: "brand.500" }}
                  onClick={loadWeb3Modal}
                >
                  Connect
                </Button>
              )
            ) : (
              ""
            )}
          </HStack>
        </Flex>
      </chakra.header>
      <Box height="72px" overflow="hidden" width="100%">
        .
      </Box>
    </>
  );
}
