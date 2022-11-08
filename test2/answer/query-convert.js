import fetch from "node-fetch";
import fs from "fs";

function transformPageTemplates(pageTemplateItems) {
  // console.log(pageTemplateItems);
  return pageTemplateItems.map((pt) => {
    const categories = pt.url?.slice(1).replace("home/", "").split("/") || [];
    const categoryObj = {};
    categories.forEach((c, index) => {
      categoryObj[index] = c.charAt(0).toUpperCase() + c.slice(1);
    });
    return {
      url: pt.url?.replace("/home", ""),
      title: pt.seo.title.replace("|", "-").trim(),
      description: pt.seo.description.slice(0, 80),
      isNoIndex: pt.seo.isNoIndex,
      category: categoryObj,
    };
  });
}

async function getPageTemplates() {
  // first 1000 records
  const promise1 = await fetch(
    "https://graphql.contentful.com/content/v1/spaces/8utyj17y1gom/environments/master?access_token=e50d8ac79fd7a3545d8c0049c6a1216f5d358a192467c77584eca6fad21e0f37",
    {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer e50d8ac79fd7a3545d8c0049c6a1216f5d358a192467c77584eca6fad21e0f37",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
      },
      referrer:
        "https://graphql.contentful.com/content/v1/spaces/8utyj17y1gom/environments/master/explore?access_token=e50d8ac79fd7a3545d8c0049c6a1216f5d358a192467c77584eca6fad21e0f37",
      body: '{"query":"query {\\n  pageTemplateCollection (skip: 0, limit: 1000, where:{\\n    seo: {\\n      sys: {\\n        id_exists: true\\n      }\\n    }\\n  }) {\\n    total\\n    skip\\n    limit\\n    items {\\n      contentfulMetadata {\\n  \\t\\t\\ttags {\\n          id\\n        }\\n      }\\n      sys {\\n        id\\n      \\tpublishedAt\\n        firstPublishedAt\\n        publishedVersion\\n      }\\n    \\turl\\n      isShowVaButton\\n      seo {\\n\\t\\t\\t\\tdescription\\n        title\\n        isNoIndex\\n      }\\n      onsiteSearchIndexing\\n    }\\n  }\\n}","variables":null}',
      method: "POST",
      mode: "cors",
    }
  );
  // remaining records
  const promise2 = await fetch(
    "https://graphql.contentful.com/content/v1/spaces/8utyj17y1gom/environments/master?access_token=e50d8ac79fd7a3545d8c0049c6a1216f5d358a192467c77584eca6fad21e0f37",
    {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer e50d8ac79fd7a3545d8c0049c6a1216f5d358a192467c77584eca6fad21e0f37",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
      },
      referrer:
        "https://graphql.contentful.com/content/v1/spaces/8utyj17y1gom/environments/master/explore?access_token=e50d8ac79fd7a3545d8c0049c6a1216f5d358a192467c77584eca6fad21e0f37",
      body: '{"query":"query {\\n  pageTemplateCollection (skip: 1000, limit: 1000, where:{\\n    seo: {\\n      sys: {\\n        id_exists: true\\n      }\\n    }\\n  }) {\\n    total\\n    skip\\n    limit\\n    items {\\n      contentfulMetadata {\\n  \\t\\t\\ttags {\\n          id\\n        }\\n      }\\n      sys {\\n        id\\n      \\tpublishedAt\\n        firstPublishedAt\\n        publishedVersion\\n      }\\n    \\turl\\n      isShowVaButton\\n      seo {\\n\\t\\t\\t\\tdescription\\n        title\\n        isNoIndex\\n      }\\n      onsiteSearchIndexing\\n    }\\n  }\\n}","variables":null}',
      method: "POST",
      mode: "cors",
    }
  );

  const result1 = await promise1.json();
  const result2 = await promise2.json();

  fs.writeFile(
    "src/app/page-template.json",
    JSON.stringify(
      transformPageTemplates(
        (result1?.data?.pageTemplateCollection?.items || []).concat(
          result2?.data?.pageTemplateCollection?.items || []
        )
      )
    ),
    (err) => {
      if (err) {
        throw err;
      }
      console.log("JSON data is saved.");
    }
  );
}

getPageTemplates();
