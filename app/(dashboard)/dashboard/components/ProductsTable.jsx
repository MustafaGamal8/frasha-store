"use client"
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

import { useRowSelect } from "@table-library/react-table-library/select";

const nodes = [
  {
    "id": "1",
    "name": "جهاز ذكي 2000",
    "price": 199,
    "description": "جهاز متعدد الوظائف يجمع بين مصباح يدوي وشاحن محمول وسماعة بلوتوث.",
    "photos": ["صورة1.jpg", "صورة2.jpg"],
    "link": "رابط المنتج",
    "categoryId": "فئة1",
    "createdAt": "2023-12-15T08:00:00Z",
    "updatedAt": "2023-12-15T08:30:00Z"
  },
  {
    "id": "2",
    "name": "كاميرا لومينا برو",
    "price": 599,
    "description": "كاميرا احترافية بقدرات معالجة صور متقدمة.",
    "photos": ["صورة3.jpg", "صورة4.jpg"],
    "link": "رابط المنتج",
    "categoryId": "فئة2",
    "createdAt": "2023-11-20T10:15:00Z",
    "updatedAt": "2023-11-20T11:00:00Z"
  },
  {
    "id": "3",
    "name": "مراقب صحة بيو",
    "price": 129,
    "description": "جهاز تتبع صحي يراقب معدل ضربات القلب وأنماط النوم ومستويات النشاط.",
    "photos": ["صورة5.jpg", "صورة6.jpg"],
    "link": "رابط المنتج",
    "categoryId": "فئة3",
    "createdAt": "2023-10-05T14:30:00Z",
    "updatedAt": "2023-10-05T15:20:00Z"
  },]


const Component = () => {
  const data = { nodes };

  const theme = useTheme([
    getTheme(),
    {
      Table: `
      --data-table-library_grid-template-columns:  25% 25% 25% 25% minmax(150px, 1fr);
    `,
      HeaderRow: `
        background-color:white;
      `,

      HeaderCell: `color: black ;`,
      Row: `
      text-align:start;

       &:first-child{
        background-color: red;
      }
      
        &:nth-of-type(odd) {
          background-color: #f7fbfe;
        
        }
        &:not(:last-of-type)>.td {
          border-bottom: none;
          padding:10px
      }

        &:nth-of-type(even) {
          background-color: #fffff;
        }
        &.row-select-selected{
          background-color: #fe80bf;
          color:white
        }
      `,
    },
  ]);


  const select = useRowSelect(data);

  const COLUMNS = [
    { label: "id", renderCell: (item) => item.id, select: true, },
    { label: "عدد الصور", renderCell: (item) => item.photos.length, resize: true, },
    { label: "السعر", renderCell: (item) => item.price, resize: true, },
    { label: "اسم المنتج", renderCell: (item) => item.name, resize: true, },
  ];


  return (
    <>
      <CompactTable
        columns={COLUMNS}
        theme={theme}
      layout={{ custom: true, horizontalScroll: true }}
        data={data}
        select={select} />

    </>
  );
};

export default Component;