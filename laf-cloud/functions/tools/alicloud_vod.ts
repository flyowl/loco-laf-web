
import RPCClient from '@alicloud/pop-core';

// https://help.aliyun.com/zh/vod/user-guide/query-media-asset-information?spm=a2c4g.11186623.0.0.27497fd1zAtQTj

export default async function (ctx: FunctionContext) {
  console.log('Hello World')

  const vodClient = new VodClient();
  vodClient.init();
  const mediaList = await vodClient.SearchMedia(1, 20, "臧其超");

  console.log(mediaList);

  const data = await vodClient.getPlayInfo('c28f105febb040368f5fbbba423cab56')

  return { data: data }
}





class VodClient<T> {
  private accessKeyId: string;
  private accessKeySecret: string;
  private endpoint: string;
  private apiVersion: string;
  private client: any;

  constructor() {
    this.accessKeyId = "";
    this.accessKeySecret = "";
    this.endpoint = 'http://vod.' + "cn-shanghai" + '.aliyuncs.com';
    this.apiVersion = '2017-03-21';
  }

  async init() {
    const client = new RPCClient({
      accessKeyId: this.accessKeyId,
      accessKeySecret: this.accessKeySecret,
      endpoint: this.endpoint,
      apiVersion: this.apiVersion
    });
    this.client = client
  }

  async initSTS(securityToken) {
    const client = new RPCClient({
      accessKeyId: this.accessKeyId,
      accessKeySecret: this.accessKeySecret,
      securityToken: securityToken,
      endpoint: this.endpoint,
      apiVersion: this.apiVersion
    });
    this.client = client
  }

  async SearchMedia(page = 1, size = 20, title: string = null) {

    let Match = "Status in ('Normal') "

    if (title != null) {
      Match = `Status in ('Normal') and Title in (${title})`
    }
    const data = await this.client.request("SearchMedia", {
      Fields: 'Title,CoverURL,Status,Duration,Size',
      Match: Match,
      PageNo: page,
      PageSize: size,
      SearchType: 'video',
    }, {});

    if (data.MediaList && data.MediaList.length > 0) { return data.MediaList; } return [];
  }

  async getPlayInfo(VideoId: string) {
    const data = await this.client.request("GetPlayInfo", {
      VideoId: VideoId
    }, {})
    if (data.PlayInfoList) { return data.PlayInfoList; } return [];

  }


  async GetVideoPlayAuth(VideoId: string) {
    const data = await this.client.request("GetPlayInfo", {
      VideoId: VideoId
    }, {})

    if (data.PlayInfoList) { return data.PlayInfoList; } return [];
  }
}

export {
  VodClient
}
