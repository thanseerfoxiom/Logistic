import React, { useEffect, useRef, useState } from "react";
import Checkbox from "./CheckBox";


export default function KendoTable({
    dataSourceConfig = {},
    columns = [],
    gridProps = {height: 550,
      excel: {
        fileName: "Export.xlsx",
        allPages: true, // This will export all data, not just the current page
      },
      pdf: {
        fileName: "Export.pdf",
        allPages: true,
        // You can add other PDF configurations as needed (e.g., paperSize, margin, etc.)
      },
    },
    containerStyle = { margin: "2px" },
    datas = [],
    selectable = false,
  }) {
    const [enableGroupable, setEnableGroupable] = useState(false);
    const [enableFilterable, setEnableFilterable] = useState(false);
    const [enableToolbar, setEnableToolbar] = useState(false);
    const gridRef = useRef(null);
  
    // Define the Index Column
    // const indexColumn = {
    //   title: "Sl.no.",
    //   width: 50,
    //   headerAttributes: { class: "index-align" },
    //   attributes: { class: "index-align" },
    // };
    // Define the Selectable Column
  
    const selectableColumn = selectable
      ? {
          selectable: true,
          width: 75,
          attributes: { class: "checkbox-align" },
          headerAttributes: { class: "checkbox-align" },
        }
      : null;
  
    // Combine Columns: Index, Selectable (if any), and other columns
    // const finalColumns = [
    //   // indexColumn,
    //   ...(selectableColumn ? [selectableColumn] : []),
    //   ...columns,
    // ];
    
    const finalColumns = [
      // indexColumn,
      ...(selectableColumn ? [selectableColumn] : []),
      ...columns.map(col => {
        if (col.field === "actions") {
          return {
            ...col,
            template: "<div class='actions-cell'></div>",
            actionButtons: col.actionButtons || []
          };
        }
        return col;
      }),
    ];
  
  
    function replaceNullsWithEmptyStrings(obj) {
      if (obj === null || obj === undefined) {
        return "";
      }
      if (Array.isArray(obj)) {
        return obj.map((item) => replaceNullsWithEmptyStrings(item));
      }
      if (typeof obj === "object") {
        const newObj = {};
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            newObj[key] = replaceNullsWithEmptyStrings(obj[key]);
          }
        }
        return newObj;
      }
      return obj;
    }
    // Initialize the Kendo Grid
    useEffect(() => {
      const $ = window.$;
      const kendo = window.kendo;
  
      if (!kendo || !$.fn.kendoGrid) {
        console.error("Kendo or jQuery not found. Check your script paths.");
        return;
      }
      
      const finalDataSourceConfig = {
        schema: {
          parse: function (response) {
            // If `response` is an array of data items:
            return response.map((item) => replaceNullsWithEmptyStrings(item));
          },
        },
        pageSize: 20,
        autoSync: true,
        data: dataSourceConfig.data || datas,
  
        ...dataSourceConfig,
      };
  
      const dataBound = function(e) {
        const grid = this;
        grid.table.find("tr").each(function() {
          const dataItem = grid.dataItem(this);
          const $actionsCell = $(this).find(".actions-cell");
          
          if (!$actionsCell.length) return;
    
          // Find actions column configuration
          const actionsColumn = finalColumns.find(col => col.field === "actions");
          if (!actionsColumn?.actionButtons) return;
    
          let htmlString = `<ul style="display: flex;  margin: 0; padding: 0; list-style: none;">`;
          
          actionsColumn.actionButtons.forEach(btn => {
            htmlString += `
              <li>
                <button class="${btn.className}" data-action-type="${btn.className}">
            ${btn.icon}
          </button>
              </li>
            `;
          });
          
          htmlString += "</ul>";
          $actionsCell.html(htmlString);
    
          // Attach click handlers
          actionsColumn.actionButtons.forEach(btn => {
            $actionsCell.find(`.${btn.className}`).on("click", () => {
              btn.onClick(dataItem);
            });
          });
        });
      };
      if (!gridRef.current) {
        gridRef.current = $("#dynamic-grid")
          .kendoGrid({
            dataSource: new kendo.data.DataSource(finalDataSourceConfig),
            dataBound: dataBound,
            columnMenu: { filterable: true },
            sortable: true,
            pageable: true,
            editable: false,
            reorderable: true,
            resizable: true,
            toolbar: enableToolbar ? ["excel", "pdf", "search"] : false,
            groupable: enableGroupable,
            filterable: enableFilterable ? { mode: "row" } :  { mode: "menu" },
            columns: finalColumns, // Use finalColumns with Index
            ...gridProps,
          })
          .data("kendoGrid");
      } else {
        // If grid already initialized, refresh it
        gridRef.current.setOptions({
          dataSource: new kendo.data.DataSource(finalDataSourceConfig),
          dataBound: dataBound,
          columns: finalColumns,
          toolbar: enableToolbar ? ["excel", "pdf", "search"] : false,
          groupable: enableGroupable,
          filterable: enableFilterable ? { mode: "row" } : { mode: "menu" },
          ...gridProps,
        });
      }
    }, [enableGroupable, enableFilterable, enableToolbar,columns]);
    // }, [dataSourceConfig, columns, gridProps, datas, selectable, enableGroupable, enableFilterable, enableToolbar]);
    useEffect(() => {
      const grid = gridRef.current;
      if (grid && datas) {
        grid.dataSource.data(datas);
      }
    }, [datas]);
    useEffect(() => {
      const grid = gridRef.current;
      if (!grid) return;
      grid.setOptions({
        groupable: enableGroupable,
        filterable: enableFilterable ? { mode: "row" } : { mode: "menu" },
        toolbar: enableToolbar ? ["excel", "pdf", "search"] : false,
      });
    }, [enableGroupable, enableFilterable, enableToolbar]);
  
    return (
    <>
      <div style={{ display: "flex",gap:"10px" }}>
        <Checkbox
          label={<div>Groupable</div>}
          value={enableGroupable}
          color={true}
          onChange={() => setEnableGroupable(!enableGroupable)}
          className="pl-[15px] "
        />
        <Checkbox
          label={<div>Filtering</div>}
          value={enableFilterable}
          color={true}
          onChange={() => setEnableFilterable(!enableFilterable)}
          className="pl-[15px] "
        />
        <Checkbox
          label={<div>Searchable</div>}
          value={enableToolbar}
          color={true}
          onChange={() => setEnableToolbar(!enableToolbar)}
          className="pl-[15px] "
        />
      </div>

      <div id="dynamic-grid" style={containerStyle}></div>

      <style>
        {`
         /* Add index column styling */
          .index-align {
            text-align: center;
            font-weight: 500;
          }

         /* Action button styles */
    .actions-cell button {
      padding: 4px;
      border: none;
      background: none;
      cursor: pointer;
      color: #6b7280; /* Tailwind gray-500 */
      // transition: color 0.2s, transform 0.2s;
    }

          .actions-cell button:hover {
            background-color: rgba(0, 0, 0, 0.05);
          }

          /* Icon colors */
          .info-btn { color: #3b82f6; }
          .delete-btn { color:rgb(182, 176, 176); }
          .edit-btn { color:rgb(61, 61, 61); }

          /* Hover effect */
          #dynamic-grid .k-grid-content  td {
            background-color: #f3f4f6 !important; /* bg-gray-100 */
          }
          #dynamic-grid .k-grid-content td {
            background-color: white !important;
          }
          #dynamic-grid .k-active{
            background-color: transparent !important;
          }

          #dynamic-grid .actions-cell button {
            padding: 5px 10px;
            background-color: transparent;
            color: inherit; /* Ensure text color is inherited */
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          #dynamic-grid .actions-cell button:hover {
      background-color: transparent !important; /* Force transparent background */
      transform: scale(1.1); /* Keep scale animation if desired */
      color: black;
      
    }
      
          /* Existing styles */
          #dynamic-grid .k-toolbar {
            background-color: hsl(210, 7%, 47%) !important;
          }
          #dynamic-grid .k-toolbar .k-button {
            color: #fff !important;
          }
          #dynamic-grid .k-grid-header {
            background-color: hsl(210, 7%, 47%) !important;
          }
          #dynamic-grid .k-grouping-header {
            background-color: hsl(210, 7%, 47%) !important;
          }
          #dynamic-grid .k-grid-header th.k-header {
            background-color: hsl(210, 7%, 47%) !important;
            color: #fff !important;
            vertical-align: middle;
            height: 43px;
          }
          #dynamic-grid .k-header-column-menu {
            align-items: self-start;
          }
          #dynamic-grid tr.k-grouping-row td {
            background-color: hsl(210, 7%, 47%) !important;
            color: #fff !important;
          }
          #dynamic-grid .k-grid-content {
            background-color: #fff !important;
          }
          #dynamic-grid .k-link {
            color: #fff !important;
          }
          #dynamic-grid .k-button {
            background-color: #969696 !important;
          }
          #dynamic-grid .k-pager-wrap {
            background-color: hsl(210, 7%, 47%) !important;
          }

          /* Index column alignment */
          .index-align {
            text-align: center;
          }
            .action-btn {
  background: none;
  border: none;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.action-btn:hover {
  background-color: rgba(95, 93, 93, 0.04);
}

/* Horizontal lines between rows */
    #dynamic-grid .k-grid-content td {
      border-bottom: 1px solid #e5e7eb !important; /* grey-200 */
    }
    #dynamic-grid .k-master-row {
          font-weight: 500;
          font-size: 0.875rem;
          line-height: 1.25rem;
    }
      

    
        `}
      </style>
    </>
  );
}
