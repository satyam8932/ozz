import streamlit as st
import os
from bs4 import BeautifulSoup
import re
from master_ozz.utils import load_local_json, save_json, init_text_audio_db, ozz_master_root_db, init_user_session_state, hoots_and_hootie_keywords, return_app_ip, ozz_master_root, set_streamlit_page_config_once, sign_in_client_user, print_line_of_error, Directory, CreateChunks, CreateEmbeddings, Retriever, init_constants
from streamlit_extras.switch_page_button import switch_page
from dotenv import load_dotenv
from custom_voiceGPT import custom_voiceGPT, VoiceGPT_options_builder
import requests
from custom_button import cust_Button
load_dotenv(os.path.join(ozz_master_root(),'.env'))
#### CHARACTERS ####

def hoots_and_hootie(width=350, height=350, 
                     self_image="hootsAndHootie.png", 
                     face_recon=True, 
                     show_video=True, 
                     input_text=True, 
                     show_conversation=True, 
                     no_response_time=3,
                     refresh_ask=True):
    
    to_builder = VoiceGPT_options_builder.create()
    to = to_builder.build()

    if 'stefan' in self_image:
        phrases = hoots_and_hootie_keywords(['stefan', 'stephen', 'stephanie', 'stephan'])
    else:
        phrases = hoots_and_hootie_keywords()
    force_db_root = True if 'force_db_root' in st.session_state and st.session_state['force_db_root'] else False

    custom_voiceGPT(
        api=f"{st.session_state['ip_address']}/api/data/voiceGPT",
        api_key=os.environ.get('ozz_key'),
        client_user=st.session_state['client_user'],
        self_image=self_image,
        width=width,
        height=height,
        hello_audio="test_audio.mp3",
        face_recon=face_recon, # True False, if face for 4 seconds, trigger api unless text being recorded trigger api, else pass
        show_video=show_video, # True False, show the video on page
        # listen=listen, # True False if True go into listen mode to trigger api
        input_text=input_text,
        show_conversation=show_conversation,
        no_response_time=no_response_time,
        refresh_ask=refresh_ask,
        force_db_root=force_db_root,
        before_trigger={'how are you': 'hoots_waves__272.mp3'},
        api_audio=f"{st.session_state['ip_address']}/api/data/",
        commands=[{
            "keywords": phrases, # keywords are case insensitive
            "api_body": {"keyword": "hey hoots"},
        }, {
            "keywords": ["bye Hoots"],
            "api_body": {"keyword": "bye hoots"},
        }
        ]
    )

    return True

def ozz():
    main_root = ozz_master_root()  # os.getcwd()
    # load_dotenv(os.path.join(main_root, ".env"))

    # if 'interviewing' in st.session_state:

    
    set_streamlit_page_config_once()

    ip_address, streamlit_ip = return_app_ip()

    if not sign_in_client_user():
        st.stop()

    user_session_state = init_user_session_state()

    characters = ['stefan', 'hootsAndHootie']
    
    refresh_ask = True if 'page_refresh' not in st.session_state else False
    st.session_state['page_refresh'] = True
    client_user = st.session_state['client_user']
    constants = init_constants()
    DATA_PATH = constants.get('DATA_PATH')
    PERSIST_PATH = constants.get('PERSIST_PATH')
    
    db_root = st.session_state['db_root']
    session_state_file_path = os.path.join(db_root, 'session_state.json')

    st.session_state['hh_vars']['self_image'] = st.session_state['self_image']

    width=st.session_state['hh_vars']['width'] if 'hc_vars' in st.session_state else 350
    height=st.session_state['hh_vars']['height'] if 'hc_vars' in st.session_state else 350
    self_image=st.session_state['hh_vars']['self_image'] if 'hc_vars' in st.session_state else f"{characters[0]}.png"
    face_recon=st.session_state['hh_vars']['face_recon'] if 'hc_vars' in st.session_state else False
    show_video=st.session_state['hh_vars']['show_video'] if 'hc_vars' in st.session_state else False
    input_text=st.session_state['hh_vars']['input_text'] if 'hc_vars' in st.session_state else True
    show_conversation=st.session_state['hh_vars']['show_conversation'] if 'hc_vars' in st.session_state else True
    no_response_time=st.session_state['hh_vars']['no_response_time'] if 'hc_vars' in st.session_state else 3
    refresh_ask=st.session_state['hh_vars']['refresh_ask'] if 'hc_vars' in st.session_state else False
    
    embedding_default = []
    if self_image == 'stefan.png':
        cols = st.columns((5,3))
        with cols[0]:
            st.header(f"Welcome {client_user} to Stefans ~Conscience...")

        embedding_default = ['stefan']
        user_session_state['use_embeddings'] = embedding_default
        save_json(session_state_file_path, user_session_state)

        text="...Well sort of, it's WIP...Responses may be delay'd, ⚡faster-thinking and processing always costs more 💰"
        with cols[0]:
            st.markdown(f''':yellow[{text}]''')

        with st.expander("3 Ways to chat with Stefan", True):
            cols = st.columns((3,2))
            with cols[0]:
                st.info("1: RECOMMENDED --> Click And Ask Button: Each time you click you can speak your question")
                st.info("2: Conversational Mode Button: Once you click, use Keyword 'Stefan', ex: 'Stefan How Are you today' (If stefan responds with a question you can directly answer it and don't need to say his name)")
                st.info("3: Chat Form: Type your questions and hit enter")
            with cols[1]:
                st.warning("Please note: Sometimes questions may be misunderstood and the response may result in inchorent manner.")
                st.warning("The LLM that uses RAG (i.e. this one) needs extra context to undestand each new query from user, Having responses tailor more accurately requires more engineering")
        
    with st.sidebar:
        embeddings = os.listdir(os.path.join(ozz_master_root(), 'STORAGE'))
        embeddings = ['None'] + embeddings
        use_embedding = st.multiselect("use embeddings", default=embedding_default, options=embeddings)
        st.session_state['use_embedding'] = use_embedding
        if st.button("save"):
            user_session_state['use_embeddings'] = use_embedding
            save_json(session_state_file_path, user_session_state)
            st.info("saved")
    

    # cols = st.columns((5,3))
    # with cols[1]:
    #     user_output = st.empty()
    with st.sidebar:
        # rep_output = st.empty()
        selected_audio_file=st.empty()
        llm_audio=st.empty()
    
    # with cols[0]:
    hoots_and_hootie(
        width=width,
        height=height,
        self_image=self_image,
        face_recon=face_recon,
        show_video=show_video,
        input_text=input_text,
        show_conversation=show_conversation,
        no_response_time=no_response_time,
        refresh_ask=refresh_ask,
        )


    def list_files_by_date(directory):
        files = []
        for filename in os.listdir(directory):
            filepath = os.path.join(directory, filename)
            if os.path.isfile(filepath):
                files.append((filepath, os.path.getmtime(filepath)))
        files.sort(key=lambda x: x[1], reverse=True)
        return files

    # Path to the directory containing audio files
    # audio_directory = "/path/to/audio/directory"

    # Get list of audio files sorted by modification date
    db_name, master_text_audio=init_text_audio_db()

    root_db = ozz_master_root_db()
    db_DB_audio = os.path.join(root_db, 'audio')
    audio_files = list_files_by_date(db_DB_audio)
    with selected_audio_file.container():
        audio_path = st.selectbox("Select Audio File", [os.path.basename(file[0]) for file in audio_files])
    # st.write(master_text_audio[-1])
    # st.write([i for i in st.session_state])
    # st.write(st.session_state['conversation_history.json'])
    response=requests.get(f"{st.session_state['ip_address']}/api/data/{audio_path}")
    with llm_audio.container():
        # st.info(kw)
        st.audio(response.content, format="audio/mp3")  
    import base64

    def local_gif(gif_path, width="33", height="33", sidebar=False, url=False):
        if url:
            data_url = data_url
        else:
            with open(gif_path, "rb") as file_:
                contents = file_.read()
                data_url = base64.b64encode(contents).decode("utf-8")
            if sidebar:
                st.sidebar.markdown(
                    f'<img src="data:image/gif;base64,{data_url}" width={width} height={height} alt="bee">',
                    unsafe_allow_html=True,
                )
            else:
                st.markdown(
                    f'<img src="data:image/gif;base64,{data_url}" width={width} height={height} alt="bee">',
                    unsafe_allow_html=True,
                )

        return True


    # st.write(client_user)
    if client_user == 'stefanstapinski@gmail.com':
        with st.sidebar:
            st.write("Admin Only")
            st.write(st.session_state)
if __name__ == '__main__':
    ozz()

