import { useState } from 'react'

interface Props {
  password: string
}

const countries = [
  "AD","AE","AF","AG","AL","AM","AO","AR","AT","AU","AZ","BA","BB","BD","BE","BF","BG","BH","BI",
  "BJ","BN","BO","BR","BS","BT","BW","BY","BZ","CA","CD","CF","CG","CH","CI","CL","CM","CN","CO",
  "CR","CU","CV","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE","EG","ER","ES","ET","FI","FJ",
  "FM","FR","GA","GB","GD","GE","GH","GI","GL","GM","GN","GQ","GR","GT","GW","GY","HN","HR","HT",
  "HU","ID","IE","IL","IN","IQ","IR","IS","IT","JM","JO","JP","KE","KG","KH","KI","KM","KN","KP",
  "KR","KW","KZ","LA","LB","LC","LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MG",
  "MK","ML","MM","MN","MT","MU","MV","MW","MX","MY","MZ","NA","NE","NG","NI","NL","NO","NP","NR",
  "NZ","OM","PA","PE","PG","PH","PK","PL","PR","PS","PT","PY","QA","RO","RS","RU","RW","SA","SB",
  "SC","SD","SE","SG","SI","SK","SL","SM","SN","SO","SR","SS","ST","SV","SY","SZ","TD","TG","TH",
  "TJ","TL","TM","TN","TO","TR","TT","TV","TW","TZ","UA","UG","US","UY","UZ","VA","VC","VE","VN",
  "VU","WS","YE","ZA","ZM","ZW"
]

const selectedCountry = countries[Math.floor(Math.random() * countries.length)]

function CountryFlagValidator({ password }: Props) {
  const [imgError, setImgError] = useState(false)

  const isValid = password.toUpperCase().includes(selectedCountry.toUpperCase())
  const flagUrl = `https://countryflagsapi.netlify.app/flag/${selectedCountry.toLowerCase()}.svg`

  return (
    <div className="validator-block">
      <div className="validator-row">
        {!imgError && (
          <img
            src={flagUrl}
            className="flag-img"
            alt={`vlajka ${selectedCountry}`}
            onError={() => setImgError(true)}
          />
        )}
        <span className={isValid ? 'badge-ok' : 'badge-fail'}>
          {isValid ? 'Splněno' : 'Nesplněno'}
        </span>
      </div>
      <div className="validator-detail">
        {isValid
          ? `✅ Zkratka nalezena v hesle`
          : `Heslo neobsahuje zkratku země}`}
      </div>
    </div>
  )
}

export default CountryFlagValidator