import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useCallback, useEffect, useState } from 'react';
import { useColorScheme, SafeAreaView } from 'react-native';
import { Avatar, EnsureFlexed, H1, H2, H3, H4, H5, H6, ScrollView, Text, View, useForceUpdate } from 'tamagui';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';



export default function TabOneScreen() {
  const colorScheme = useColorScheme()
  const [beginDate, setBeginDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [country, setCountry] = useState(null);
  const [countryOpen, setCountryOpen] = useState<boolean>(false);
  const [city, setCity] = useState(null);
  const [cityOpen, setCityOpen] = useState<boolean>(false);

  const [countries, setCountries] = useState([
    { label: 'Afghanistan', value: 'Afghanistan', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/af.png')} /> },
    { label: 'Albania', value: 'Albania', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/al.png')} />  },
    { label: 'Algeria', value: 'Algeria', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/dz.png')} />  },
    { label: 'Andorra', value: 'AD', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ad.png')} /> },
    { label: 'Angola', value: 'AO', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ao.png')} /> },
    { label: 'Antigua and Barbuda', value: 'AG', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ag.png')} /> },
    { label: 'Argentina', value: 'AR', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ar.png')} /> },
    { label: 'Armenia', value: 'AM', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/am.png')} /> },
    { label: 'Australia', value: 'AU', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/au.png')} /> },
    { label: 'Austria', value: 'AT', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/at.png')} /> },
    { label: 'Azerbaijan', value: 'AZ', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/az.png')} /> },
    { label: 'The Bahamas', value: 'BS', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/bs.png')} /> },
    { label: 'Bahrain', value: 'BH', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/bh.png')} /> },
    { label: 'Bangladesh', value: 'BD', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/bd.png')} /> },
    { label: 'Barbados', value: 'BB', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/bb.png')} /> },
    { label: 'Belarus', value: 'BY', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/by.png')} /> },
    { label: 'Belgium', value: 'BE', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/be.png')} /> },
    { label: 'Belize', value: 'BZ', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/bz.png')} /> },
    { label: 'Benin', value: 'BJ', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/bj.png')} /> },
    { label: 'Bhutan', value: 'BT', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/bt.png')} /> },
    { label: 'Bolivia', value: 'BO', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/bo.png')} /> },
    { label: 'Bosnia and Herzegovina', value: 'BA', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ba.png')} /> },
    { label: 'Botswana', value: 'BW', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/bw.png')} /> },
    { label: 'Brazil', value: 'BR', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/br.png')} /> },
    { label: 'Brunei', value: 'BN', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/bn.png')} /> },
    { label: 'Bulgaria', value: 'BG', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/bg.png')} /> },
    { label: 'Burkina Faso', value: 'BF', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/bf.png')} /> },
    { label: 'Burundi', value: 'BI', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/bi.png')} /> },
    { label: 'Cabo Verde', value: 'CV', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/cv.png')} /> },
    { label: 'Cambodia', value: 'KH', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/kh.png')} /> },
    { label: 'Cameroon', value: 'CM', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/cm.png')} /> },
    { label: 'Canada', value: 'CA', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ca.png')} /> },
    { label: 'Central African Republic', value: 'CF', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/cf.png')} /> },
    { label: 'Chad', value: 'TD', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/td.png')} /> },
    { label: 'Chile', value: 'CL', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/cl.png')} /> },
    { label: 'China', value: 'CN', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/cn.png')} /> },
    { label: 'Colombia', value: 'CO', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/co.png')} /> },
    { label: 'Comoros', value: 'KM', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/km.png')} /> },
    { label: 'Congo, Democratic Republic of the', value: 'CD', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/cd.png')} /> },
    { label: 'Congo, Republic of the', value: 'CG', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/cg.png')} /> },
    { label: 'Costa Rica', value: 'CR', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/cr.png')} /> },
    { label: 'Côte d’Ivoire', value: 'CI', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ci.png')} /> },
    { label: 'Croatia', value: 'HR', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/hr.png')} /> },
    { label: 'Cuba', value: 'CU', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/cu.png')} /> },
    { label: 'Cyprus', value: 'CY', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/cy.png')} /> },
    { label: 'Czech Republic', value: 'CZ', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/cz.png')} /> },
    { label: 'Denmark', value: 'DK', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/dk.png')} /> },
    { label: 'Djibouti', value: 'DJ', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/dj.png')} /> },
    { label: 'Dominica', value: 'DM', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/dm.png')} /> },
    { label: 'Dominican Republic', value: 'DO', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/do.png')} /> },
    { label: 'East Timor (Timor-Leste)', value: 'TL', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/tl.png')} /> },
    { label: 'Ecuador', value: 'EC', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ec.png')} /> },
    { label: 'Egypt', value: 'EG', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/eg.png')} /> },
    { label: 'El Salvador', value: 'SV', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/sv.png')} /> },
    { label: 'Equatorial Guinea', value: 'GQ', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/gq.png')} /> },
    { label: 'Eritrea', value: 'ER', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/er.png')} /> },
    { label: 'Estonia', value: 'EE', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ee.png')} /> },
    { label: 'Eswatini', value: 'SZ', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/sz.png')} /> },
    { label: 'Ethiopia', value: 'ET', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/et.png')} /> },
    { label: 'Fiji', value: 'FJ', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/fj.png')} /> },
    { label: 'Finland', value: 'FI', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/fi.png')} /> },
    { label: 'France', value: 'FR', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/fr.png')} /> },
    { label: 'Gabon', value: 'GA', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ga.png')} /> },
    { label: 'The Gambia', value: 'GM', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/gm.png')} /> },
    { label: 'Georgia', value: 'GE', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ge.png')} /> },
    { label: 'Germany', value: 'DE', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/de.png')} /> },
    { label: 'Ghana', value: 'GH', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/gh.png')} /> },
    { label: 'Greece', value: 'GR', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/gr.png')} /> },
    { label: 'Grenada', value: 'GD', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/gd.png')} /> },
    { label: 'Guatemala', value: 'GT', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/gt.png')} /> },
    { label: 'Guinea', value: 'GN', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/gn.png')} /> },
    { label: 'Guinea-Bissau', value: 'GW', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/gw.png')} /> },
    { label: 'Guyana', value: 'GY', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/gy.png')} /> },
    { label: 'Haiti', value: 'HT', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ht.png')} /> },
    { label: 'Honduras', value: 'HN', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/hn.png')} /> },
    { label: 'Hungary', value: 'HU', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/hu.png')} /> },
    { label: 'Iceland', value: 'IS', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/is.png')} /> },
    { label: 'India', value: 'IN', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/in.png')} /> },
    { label: 'Indonesia', value: 'ID', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/id.png')} /> },
    { label: 'Iran', value: 'IR', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ir.png')} /> },
    { label: 'Iraq', value: 'IQ', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/iq.png')} /> },
    { label: 'Ireland', value: 'IE', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ir.png')} /> },
    { label: 'Italy', value: 'IT', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/it.png')} /> },
    { label: 'Jamaica', value: 'JM', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/jm.png')} /> },
    { label: 'Japan', value: 'JP', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/jp.png')} /> },
    { label: 'Jordan', value: 'JO', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/jo.png')} /> },
    { label: 'Kazakhstan', value: 'KZ', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/kz.png')} /> },
    { label: 'Kenya', value: 'KE', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ke.png')} /> },
    { label: 'Kiribati', value: 'KI', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ki.png')} /> },
    { label: 'Korea, North', value: 'KP', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/kp.png')} /> },
    { label: 'Korea, South', value: 'KR', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/kr.png')} /> },
    { label: 'Kosovo', value: 'XK', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/xk.png')} /> },
    { label: 'Kuwait', value: 'KW', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/kw.png')} /> },
    { label: 'Kyrgyzstan', value: 'KG', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/kg.png')} /> },
    { label: 'Laos', value: 'LA', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/la.png')} /> },
    { label: 'Latvia', value: 'LV', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/lv.png')} /> },
    { label: 'Lebanon', value: 'LB', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/lb.png')} /> },
    { label: 'Lesotho', value: 'LS', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ls.png')} /> },
    { label: 'Liberia', value: 'LR', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/lr.png')} /> },
    { label: 'Libya', value: 'LY', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ly.png')} /> },
    { label: 'Liechtenstein', value: 'LI', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/li.png')} /> },
    { label: 'Lithuania', value: 'LT', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/lt.png')} /> },
    { label: 'Luxembourg', value: 'LU', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/lu.png')} /> },
    { label: 'Madagascar', value: 'MG', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/mg.png')} /> },
    { label: 'Malawi', value: 'MW', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/mw.png')} /> },
    { label: 'Malaysia', value: 'MY', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/my.png')} /> },
    { label: 'Maldives', value: 'MV', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/mv.png')} /> },
    { label: 'Mali', value: 'ML', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ml.png')} /> },
    { label: 'Malta', value: 'MT', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/mt.png')} /> },
    { label: 'Marshall Islands', value: 'MH', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/mh.png')} /> },
    { label: 'Mauritania', value: 'MR', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/mr.png')} /> },
    { label: 'Mauritius', value: 'MU', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/mu.png')} /> },
    { label: 'Mexico', value: 'MX', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/mx.png')} /> },
    { label: 'Micronesia, Federated States of', value: 'FM', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/fm.png')} /> },
    { label: 'Moldova', value: 'MD', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/md.png')} /> },
    { label: 'Monaco', value: 'MC', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/mc.png')} /> },
    { label: 'Mongolia', value: 'MN', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/mn.png')} /> },
    { label: 'Montenegro', value: 'ME', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/me.png')} /> },
    { label: 'Morocco', value: 'MA', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ma.png')} /> },
    { label: 'Mozambique', value: 'MZ', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/mz.png')} /> },
    { label: 'Myanmar (Burma)', value: 'MM', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/mm.png')} /> },
    { label: 'Namibia', value: 'NA', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/na.png')} /> },
    { label: 'Nauru', value: 'NR', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/nr.png')} /> },
    { label: 'Nepal', value: 'NP', icon: () => <Image style={{width: 20, height: 24}} source={require('../flags/np.png')} /> },
    { label: 'Netherlands', value: 'NL', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/nl.png')} /> },
    { label: 'New Zealand', value: 'NZ', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/nz.png')} /> },
    { label: 'Nicaragua', value: 'NI', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ni.png')} /> },
    { label: 'Niger', value: 'NE', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ne.png')} /> },
    { label: 'Nigeria', value: 'NG', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ng.png')} /> },
    { label: 'North Macedonia', value: 'MK', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/mk.png')} /> },
    { label: 'Norway', value: 'NO', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/no.png')} /> },
    { label: 'Oman', value: 'OM', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/om.png')} /> },
    { label: 'Pakistan', value: 'PK', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/pk.png')} /> },
    { label: 'Palau', value: 'PW', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/pw.png')} /> },
    { label: 'Palestine', value: 'PS', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ps.png')} /> },
    { label: 'Panama', value: 'PA', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/pa.png')} /> },
    { label: 'Papua New Guinea', value: 'PG', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/pg.png')} /> },
    { label: 'Paraguay', value: 'PY', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/py.png')} /> },
    { label: 'Peru', value: 'PE', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/pe.png')} /> },
    { label: 'Philippines', value: 'PH', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ph.png')} /> },
    { label: 'Poland', value: 'PL', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/pl.png')} /> },
    { label: 'Portugal', value: 'PT', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/pt.png')} /> },
    { label: 'Qatar', value: 'QA', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/qa.png')} /> },
    { label: 'Romania', value: 'RO', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ro.png')} /> },
    { label: 'Russia', value: 'RU', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ru.png')} /> },
    { label: 'Rwanda', value: 'RW', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/rw.png')} /> },
    { label: 'Saint Kitts and Nevis', value: 'KN', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/kn.png')} /> },
    { label: 'Saint Lucia', value: 'LC', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/lc.png')} /> },
    { label: 'Saint Vincent and the Grenadines', value: 'VC', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/vc.png')} /> },
    { label: 'Samoa', value: 'WS', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ws.png')} /> },
    { label: 'San Marino', value: 'SM', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/sm.png')} /> },
    { label: 'Sao Tome and Principe', value: 'ST', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/st.png')} /> },
    { label: 'Saudi Arabia', value: 'SA', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/sa.png')} /> },
    { label: 'Senegal', value: 'SN', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/sn.png')} /> },
    { label: 'Serbia', value: 'RS', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/rs.png')} /> },
    { label: 'Seychelles', value: 'SC', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/sc.png')} /> },
    { label: 'Sierra Leone', value: 'SL', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/sl.png')} /> },
    { label: 'Singapore', value: 'SG', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/sg.png')} /> },
    { label: 'Slovakia', value: 'SK', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/sk.png')} /> },
    { label: 'Slovenia', value: 'SI', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/si.png')} /> },
    { label: 'Solomon Islands', value: 'SB', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/sb.png')} /> },
    { label: 'Somalia', value: 'SO', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/so.png')} /> },
    { label: 'South Africa', value: 'ZA', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/za.png')} /> },
    { label: 'Spain', value: 'ES', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/es.png')} /> },
    { label: 'Sri Lanka', value: 'LK', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/lk.png')} /> },
    { label: 'Sudan', value: 'SD', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/sd.png')} /> },
    { label: 'Sudan, South', value: 'SS', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ss.png')} /> },
    { label: 'Suriname', value: 'SR', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/sr.png')} /> },
    { label: 'Sweden', value: 'SE', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/se.png')} /> },
    { label: 'Switzerland', value: 'CH', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ch.png')} /> },
    { label: 'Syria', value: 'SY', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/sy.png')} /> },
    { label: 'Taiwan', value: 'TW', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/tw.png')} /> },
    { label: 'Tajikistan', value: 'TJ', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/tj.png')} /> },
    { label: 'Tanzania', value: 'TZ', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/tz.png')} /> },
    { label: 'Thailand', value: 'TH', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/th.png')} /> },
    { label: 'Togo', value: 'TG', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/tg.png')} /> },
    { label: 'Tonga', value: 'TO', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/to.png')} /> },
    { label: 'Trinidad and Tobago', value: 'TT', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/tt.png')} /> },
    { label: 'Tunisia', value: 'TN', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/tn.png')} /> },
    { label: 'Turkey', value: 'TR', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/tr.png')} /> },
    { label: 'Turkmenistan', value: 'TM', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/tm.png')} /> },
    { label: 'Tuvalu', value: 'TV', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/tv.png')} /> },
    { label: 'Uganda', value: 'UG', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ug.png')} /> },
    { label: 'Ukraine', value: 'UA', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ua.png')} /> },
    { label: 'United Arab Emirates', value: 'AE', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ae.png')} /> },
    { label: 'United Kingdom', value: 'GB', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/gb.png')} /> },
    { label: 'United States', value: 'US', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/us.png')} /> },
    { label: 'Uruguay', value: 'UY', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/uy.png')} /> },
    { label: 'Uzbekistan', value: 'UZ', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/uz.png')} /> },
    { label: 'Vanuatu', value: 'VU', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/vu.png')} /> },
    { label: 'Vatican City', value: 'VA', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/va.png')} /> },
    { label: 'Venezuela', value: 'VE', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ve.png')} /> },
    { label: 'Vietnam', value: 'VN', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/vn.png')} /> },
    { label: 'Yemen', value: 'YE', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/ye.png')} /> },
    { label: 'Zambia', value: 'ZM', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/zm.png')} /> },
    { label: 'Zimbabwe', value: 'ZW', icon: () => <Image style={{width: 36, height: 24}} source={require('../flags/zw.png')} /> },
  ]);

  const onCountryOpen = useCallback(() => {
    setCityOpen(false);
  }, []);

  const onCityOpen = useCallback(() => {
    setCountryOpen(false);
  }, []);

  const handleBeginDateChange = (e: DateTimePickerEvent, d: Date | undefined) => {
    if (d) {
      setBeginDate(new Date(d));
    }
  };

  const handleEndDateChange = (e: DateTimePickerEvent, d: Date | undefined) => {
    if (d) {
      setEndDate(new Date(d));
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.XBox}>
        <View style={styles.YBox}>
          <H3>Hey, Faizaan</H3>
          <H6>Let's go places.</H6>
        </View>

        <Avatar circular size="$4">
          <Avatar.Image
            accessibilityLabel="Nate Wienert"
            src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
          />
          <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
        </Avatar>
      </View>
      <H4 style={{ paddingLeft: 30 }}>Create a travel plan</H4>
      <View style={StyleSheet.flatten([styles.XBox, { padding: 20 }, { paddingRight: 30 }, { paddingTop: 15 }])}>
        <View style={styles.YBox}>
          <H6 style={{ paddingLeft: 12 }}>Begin Date</H6>
          <RNDateTimePicker style={{ paddingTop: 5 }} onChange={(e, d) => handleBeginDateChange} value={beginDate} minimumDate={beginDate} />
        </View>
        <H6>To</H6>
        <View style={styles.YBox}>
          <H6 style={{ paddingLeft: 12 }}>End Date</H6>
          <RNDateTimePicker style={{ paddingTop: 5 }} onChange={(e, d) => handleEndDateChange} value={endDate} minimumDate={beginDate} />
        </View>
      </View>
      <View style={StyleSheet.flatten([styles.XBox, { padding: 28 }, { paddingTop: 10 }])}>
        <DropDownPicker
          open={countryOpen}
          value={country}
          items={countries}
          setOpen={setCountryOpen}
          setValue={setCountry}
          setItems={setCountries}
          searchable={true}
          searchPlaceholder='Search'
          theme={`${colorScheme === 'dark' ? 'DARK' : 'LIGHT'}`}
          placeholder='Select a country'
          placeholderStyle={{
            fontWeight: "500",
            fontSize: 16
          }}
          maxHeight={400}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  XBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30
  },
  YBox: {
    display: 'flex',
    flexDirection: 'column',
  },
});