# 🚀 48th Members GraphQL API Service (Educational Project)

A high-performance GraphQL API service providing detailed member profiles and optimized image CDN locations for BNK48 and CGM48.

This project is created to serve as an educational sandbox for frontend developers to practice writing API queries, building integrations, and designing stunning user interfaces.

---

## Disclaimer (Intellectual Property & Licensing)

- **Educational Purpose Only:** This project is developed purely for educational and training purposes (studying GraphQL, Node.js/Bun Serverless APIs, and database structure design). **No profit or commercial gains are sought (Non-Commercial & 100% Free).**
- **Intellectual Property Rights:** All biographical profile details and original media links belong to **Independent Artist Management Co., Ltd. (iAM)**. The accurate records are sourced directly from the official portals [BNK48 Official](https://www.bnk48.com/) and [CGM48 Official](https://cgm48official.com/).
- **Image Hosting:** This system does not host any media files locally. All image references correspond to the public optimized community CDN repository [withmywish/48th-members-cdn](https://github.com/withmywish/48th-members-cdn).
- _If the copyright holder wishes to suspend publishing or request the removal of this codebase, please contact the developer immediately. We will shut down the server and delete all databases without hesitation._

---

---

## 🔗 Data Sourcing & Credibility

To provide accurate and realistic educational profiles, all member records are cross-checked and maintained via public community channels:

1. **Official Websites:** [cgm48official.com](https://www.cgm48official.com/) and [bnk48.com](https://www.bnk48.com/) for official Thai spelling, birthdays, heights, and hometown provinces.
2. **International Wikis:** [Stage48 Wiki (BNK48)](http://stage48.net/wiki/index.php/BNK48_Members) and [Stage48 Wiki (CGM48)](http://stage48.net/wiki/index.php/CGM48_Members) for complete global records.
3. **Local Portals:** **BNK48 & CGM48 Fandom Wiki**, plus various community review threads, debut announcements, and official introducing media (e.g. for the new CGM48 Gen 5 debut roster in early 2026), assuring the dataset is incredibly precise and up-to-date.

---

## 🛰️ GraphQL Query Examples

You can run the following query examples directly in the GraphiQL playground:

### 1. Fetch All Members

```graphql
query GetAllMembers {
  members {
    id
    name
    fullNameTh
    fullNameEn
    group
    team
    generation
    dateOfBirth
    height
    province
    likes
    bloodGroup
    hobby
    image
  }
}
```

### 2. Search a Single Member by Name (Case-Insensitive)

```graphql
query GetSingleMember {
  member(name: "hoop") {
    fullNameTh
    fullNameEn
    group
    team
    generation
    province
    likes
    hobby
    image
  }
}
```

### 3. Filter Members by Keyword in Likes

Finds all members who share a specific hobby/like (e.g., `"ร้องเพลง"` for singing, `"เต้น"` for dancing, or `"TikTok"`):

```graphql
query FindMembersByLike {
  filterByLike(keyword: "เต้น") {
    name
    group
    generation
    likes
    hobby
  }
}
```
