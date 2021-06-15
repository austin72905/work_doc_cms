using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;

namespace WorkDocCMS.Utils
{
    public class HttpUtil
    {
        private static readonly HttpClient Client = new HttpClient();
        //private static HttpResponseMessage Response;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public static async Task<string> Post(string url,object data, ContentType type)
        {
            string result;
            string content = JsonSerializer.Serialize(data);
            if (type == ContentType.FORM)
            {
                content = GetQueryString(data);
            }

            byte[] buffer = Encoding.UTF8.GetBytes(content);

            using (var byteContent = new ByteArrayContent(buffer))
            {
                byteContent.Headers.ContentType = new MediaTypeHeaderValue(GetVal(type.ToString()));
                var response = await Client.PostAsync(url, byteContent);
                result = await response.Content.ReadAsStringAsync();
            }
            
            return result;
        }

        public static async Task<string> Get(string url, object data)
        {
            url = $"{url}?{GetQueryString(data)}";
            var response = await Client.GetAsync(url);
            var result = await response.Content.ReadAsStringAsync();
            return result;
        }

        public enum ContentType
        {
            [Description("application/json")]
            JSON=0,
            [Description("application/x-www-form-urlencoded")]
            FORM =1,
        }

        private static string GetVal(string val)
        {
            Type type = typeof(ContentType);
            var name = System.Enum.GetNames(type).Where(o => o.Equals(val,StringComparison.CurrentCultureIgnoreCase)).Select(o=>o).FirstOrDefault();
            var field = type.GetField(name);
            var atribute = field.GetCustomAttributes(typeof(DescriptionAttribute), false);
            return ((DescriptionAttribute)atribute[0]).Description;
        }

        private static string GetQueryString(object data)
        {
            var props = from p in data.GetType().GetProperties()//取得這個物件(ex: 某個類)裡所有的屬性
                        where p.GetValue(data) != null//GetValue 取得該物件對應的值   PropertyInfo.GetValue
                        select p.Name + "=" + HttpUtility.UrlEncode(p.GetValue(data).ToString());

            return string.Join("&", props.ToArray());
        }
    }
}
